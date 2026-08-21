import { Queue, Worker } from 'bullmq';
const connection = { host: 'localhost', port: 6379 };
export const reminderQueue = new Queue('reminders', { connection });

export const reminderWorker = new Worker('reminders', async job => {
  console.log('Sending reminder', job.data);
}, { connection });

