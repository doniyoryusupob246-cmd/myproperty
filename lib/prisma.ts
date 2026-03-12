// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Простая заглушка для сборки
const prisma = (() => {
  // Во время сборки возвращаем прокси, который не инициализирует клиент
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.NEXT_PHASE === 'phase-production-build'
  ) {
    return new Proxy({} as PrismaClient, {
      get(target, prop) {
        return async () => {
          throw new Error('PrismaClient не должен использоваться во время сборки');
        };
      },
    });
  }

  // В рантайме создаем реальный клиент
  const globalForPrisma = global as unknown as { prisma: PrismaClient };

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error'] : ['error'],
    });
  }

  return globalForPrisma.prisma;
})();

export default prisma;
