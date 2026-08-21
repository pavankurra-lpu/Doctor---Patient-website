import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAll = async (req: Request, res: Response) => { res.json({ message: 'messages endpoint' }); };

