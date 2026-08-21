import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getPatient = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const patient = await prisma.patient.findUnique({
    where: { id },
    include: { PatientCondition: true, Visit: true, Prescription: true, Report: true, Message: true }
  });
  if (!patient) return res.status(404).json({ error: 'Not found' });
  res.json(patient);
};
