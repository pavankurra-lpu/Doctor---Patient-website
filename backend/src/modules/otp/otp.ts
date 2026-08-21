import crypto from 'crypto';
import Redis from 'ioredis';
import bcrypt from 'bcrypt';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export async function generateOTP(): Promise<string> {
  return crypto.randomInt(100000, 999999).toString();
}

export async function hashOTP(otp: string): Promise<string> {
  return bcrypt.hash(otp, 10);
}

export async function verifyOTP(otp: string, hash: string): Promise<boolean> {
  return bcrypt.compare(otp, hash);
}

export async function storeOTP(phone: string, otpHash: string): Promise<void> {
  await redis.set(\otp:\\, otpHash, 'EX', 300); // 5 mins
}

export async function checkRateLimit(phone: string): Promise<boolean> {
  const count = await redis.incr(\atelimit:\\);
  if (count === 1) await redis.expire(\atelimit:\\, 3600); // 1 hour
  return count <= 5;
}

export async function checkCooldown(phone: string): Promise<boolean> {
  const exists = await redis.exists(\cooldown:\\);
  if (exists) return false;
  await redis.set(\cooldown:\\, '1', 'EX', 60); // 60s cooldown
  return true;
}

export async function sendSMS(phone: string, text: string) {
  if (process.env.DEV_MODE === 'true') {
    console.log(\[DEV_MODE] SMS to \: \\);
    return;
  }
  // TODO: implement MSG91/Twilio real call here
}
