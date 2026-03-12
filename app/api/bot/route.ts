// app/api/bot/route.js
import { NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';
import { PrismaClient } from '@prisma/client';

// Инициализация (один раз при старте)
const token = process.env.BOT_TOKEN || '';
const prisma = new PrismaClient();
const bot = new TelegramBot(token);

// Проверяем секретный токен
function validateSecret(request: any) {
  const secretToken = request.headers.get('x-telegram-bot-api-secret-token');
  return secretToken === process.env.TELEGRAM_WEBHOOK_SECRET;
}

// POST метод для вебхука

export async function POST(request: any) {
  // Проверка авторизации
  if (!validateSecret(request)) {
    console.error('❌ Неавторизованный запрос к вебхуку');
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await request.json();
    console.log('📨 Получено сообщение:', body.message?.text);

    const msg = body.message;

    // Обработка команды /start
    if (msg?.text === '/start') {
      const chatId = msg.chat.id;
      const telegramId = msg.from?.id?.toString();

      const firstName = msg.from?.first_name;
      const lastName = msg.from?.last_name;
      const username = msg.from?.username;

      if (!telegramId) {
        return NextResponse.json({ ok: true });
      }

      // Сохраняем пользователя в БД
      await prisma.user.upsert({
        where: { telegramId },
        update: { chatId: chatId.toString() },
        create: {
          telegramId,
          chatId: chatId.toString(),
          firstName,
          lastName,
          username,
        },
      });

      // Отправляем приветствие с кнопками Web App
      await bot.sendMessage(chatId, 'Привет! Я могу найти квартиру мечты', {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '🔍 Создать фильтр',
                web_app: { url: `${process.env.APP_URL}/filter/new` },
              },
              {
                text: '📋 Мои фильтры',
                web_app: { url: `${process.env.APP_URL}/filters` },
              },
            ],
          ],
        },
      });

      console.log(`✅ Ответ отправлен пользователю ${telegramId}`);
    }

    // Обработка данных из Web App
    if (msg?.web_app_data) {
      try {
        const data = JSON.parse(msg.web_app_data.data);
        console.log('📱 Данные из Mini App:', data);

        if (data.action === 'create_filter') {
          const user = await prisma.user.findUnique({
            where: { telegramId: msg.from?.id?.toString() },
          });

          if (!user) {
            await bot.sendMessage(msg.chat.id, '❌ Пользователь не найден. Напишите /start');
            return NextResponse.json({ ok: true });
          }

          await prisma.filter.create({
            data: {
              userId: user.id,
              name: data.name || 'Мой фильтр',
              type: data.type || 'rent',
              criteria: data.criteria || {},
              isActive: true,
            },
          });

          await bot.sendMessage(msg.chat.id, '✅ Фильтр успешно создан!');
          console.log(`✅ Фильтр создан для пользователя ${user.telegramId}`);
        }
      } catch (error) {
        console.error('❌ Ошибка обработки Web App данных:', error);
        await bot.sendMessage(msg.chat.id, '❌ Ошибка при создании фильтра');
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('❌ Ошибка в вебхуке:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// GET метод для проверки статуса
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Bot webhook endpoint is working',
    webhook_set: true,
    timestamp: new Date().toISOString(),
  });
}
