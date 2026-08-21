$modules = @('patients', 'visits', 'prescriptions', 'reports', 'follow-up-plans', 'messages', 'family-links', 'admin', 'jobs')
foreach ($m in $modules) {
  $content = "import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAll = async (req: Request, res: Response) => { res.json({ message: '$m endpoint' }); };
"
  Set-Content -Path "src/modules/$m/$m.controller.ts" -Value $content
}

Set-Content -Path "src/modules/jobs/bullmq.ts" -Value "import { Queue, Worker } from 'bullmq';
const connection = { host: 'localhost', port: 6379 };
export const reminderQueue = new Queue('reminders', { connection });

export const reminderWorker = new Worker('reminders', async job => {
  console.log('Sending reminder', job.data);
}, { connection });
"

Set-Content -Path "src/middleware/audit-logger.ts" -Value "import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const auditLog = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== 'GET') {
    await prisma.auditLog.create({ data: { actor_user_id: 'system', action: req.method, target_table: req.baseUrl, target_id: 'new', changes_json: req.body } });
  }
  next();
};
"
