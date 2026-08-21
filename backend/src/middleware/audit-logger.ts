import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const auditLog = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== 'GET') {
    await prisma.auditLog.create({ data: { actor_user_id: 'system', action: req.method, target_table: req.baseUrl, target_id: 'new', changes_json: req.body } });
  }
  next();
};

