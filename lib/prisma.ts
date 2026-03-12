// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// Создаем клиент с проверкой на серверный рендеринг
export const prisma = (() => {
  if (typeof window === 'undefined') {
    if (!global.prisma) {
      global.prisma = new PrismaClient({
        log: process.env.NODE_ENV === 'development' 
          ? ['query', 'error', 'warn'] 
          : ['error'],
      });
    }
    return global.prisma;
  }
  return {} as PrismaClient; // Заглушка для браузера
})();

export default prisma;