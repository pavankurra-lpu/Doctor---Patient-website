import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function generatePatientId(name: string, phone: string): Promise<string> {
  const letters = name.substring(0, 2).toUpperCase().padEnd(2, 'X');
  const numbers = phone.slice(-4).padStart(4, '0');
  
  const baseId = \\\\;
  let finalId = baseId;
  let counter = 2;
  
  while (true) {
    const existing = await prisma.patient.findUnique({ where: { id: finalId } });
    if (!existing) {
      return finalId;
    }
    finalId = \\-\\;
    counter++;
  }
}
