import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export const genId = () => nanoid(16);
