import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { generatePatientId } from '../id-generator/id-generator';
import { generateOTP, hashOTP, verifyOTP, storeOTP, checkRateLimit, checkCooldown, sendSMS } from '../otp/otp';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response): Promise<any> => {
  const { name, phone } = req.body;
  if (!name || !phone) return res.status(400).json({ error: 'Name and phone are required' });
  
  const canRequest = await checkRateLimit(phone);
  if (!canRequest) return res.status(429).json({ error: 'Too many requests' });
  const canResend = await checkCooldown(phone);
  if (!canResend) return res.status(429).json({ error: 'Please wait 60s before requesting again' });

  const id = await generatePatientId(name, phone);
  
  // Create pending patient
  await prisma.patient.upsert({
    where: { phone },
    update: { name, verified: false },
    create: { id, name, phone, verified: false }
  });

  const otp = await generateOTP();
  const hashed = await hashOTP(otp);
  await storeOTP(phone, hashed);
  
  const session_id = crypto.randomUUID();
  await prisma.otpRequest.create({
    data: { target_phone: phone, otp_hash: hashed, purpose: 'registration', session_id, expires_at: new Date(Date.now() + 5 * 60000) }
  });

  await sendSMS(phone, \Your CareLoop OTP is \\);
  
  return res.json({ unique_id: id, registration_session_id: session_id });
};

export const verifyRegistrationOTP = async (req: Request, res: Response): Promise<any> => {
  const { registration_session_id, otp } = req.body;
  const request = await prisma.otpRequest.findUnique({ where: { session_id: registration_session_id } });
  if (!request) return res.status(404).json({ error: 'Session not found' });
  if (request.attempts >= 5) return res.status(400).json({ error: 'Max attempts reached' });
  if (new Date() > request.expires_at) return res.status(400).json({ error: 'OTP expired' });

  const isValid = await verifyOTP(otp, request.otp_hash);
  if (!isValid) {
    await prisma.otpRequest.update({ where: { id: request.id }, data: { attempts: request.attempts + 1 } });
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  const patient = await prisma.patient.update({
    where: { phone: request.target_phone },
    data: { verified: true }
  });

  const jwtToken = jwt.sign({ id: patient.id, role: 'patient' }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  
  // Send ID via SMS
  await sendSMS(patient.phone, \Your CareLoop ID is \ — save this for future logins\);
  
  return res.json({ jwt: jwtToken, unique_id: patient.id });
};

export const requestLoginOTP = async (req: Request, res: Response): Promise<any> => {
  const { unique_id } = req.body;
  const patient = await prisma.patient.findUnique({ where: { id: unique_id } });
  if (!patient) return res.status(404).json({ error: 'Patient not found' });
  
  const canRequest = await checkRateLimit(patient.phone);
  if (!canRequest) return res.status(429).json({ error: 'Too many requests' });
  const canResend = await checkCooldown(patient.phone);
  if (!canResend) return res.status(429).json({ error: 'Please wait 60s before requesting again' });

  const otp = await generateOTP();
  const hashed = await hashOTP(otp);
  await storeOTP(patient.phone, hashed);
  
  const session_id = crypto.randomUUID();
  await prisma.otpRequest.create({
    data: { target_phone: patient.phone, otp_hash: hashed, purpose: 'login', session_id, expires_at: new Date(Date.now() + 5 * 60000) }
  });

  await sendSMS(patient.phone, \Your CareLoop login OTP is \\);
  
  return res.json({ login_session_id: session_id });
};

export const verifyLoginOTP = async (req: Request, res: Response): Promise<any> => {
  const { login_session_id, otp } = req.body;
  const request = await prisma.otpRequest.findUnique({ where: { session_id: login_session_id } });
  if (!request) return res.status(404).json({ error: 'Session not found' });
  if (request.attempts >= 5) return res.status(400).json({ error: 'Max attempts reached' });
  if (new Date() > request.expires_at) return res.status(400).json({ error: 'OTP expired' });

  const isValid = await verifyOTP(otp, request.otp_hash);
  if (!isValid) {
    await prisma.otpRequest.update({ where: { id: request.id }, data: { attempts: request.attempts + 1 } });
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  const patient = await prisma.patient.findUnique({ where: { phone: request.target_phone } });
  const jwtToken = jwt.sign({ id: patient?.id, role: 'patient' }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  
  return res.json({ jwt: jwtToken });
};

