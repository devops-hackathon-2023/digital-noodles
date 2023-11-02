import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';

import { prisma } from '@/backend/prisma/implementation';

container.register<PrismaClient>('PrismaClient', {
    useValue: prisma,
});