import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class TaskRateLimiterMiddleware implements NestMiddleware {
  private requests = new Map<string, { count: number; timestamp: number }>();

  use(req: any, res: any, next: () => void) {
    const key = req.ip; // Используем IP клиента как ключ
    const now = Date.now();

    // Установите лимиты
    const limit = 10; // Лимит запросов, например, 10 запросов
    const windowTime = 60 * 1000; // Время окна 1 минута

    if (!this.requests.has(key)) {
      this.requests.set(key, { count: 1, timestamp: now });
    } else {
      const requestData = this.requests.get(key);
      const timeDifference = now - requestData.timestamp;

      if (timeDifference > windowTime) {
        // Сбросить счетчик, если время прошло
        this.requests.set(key, { count: 1, timestamp: now });
      } else {
        // Увеличить счетчик
        requestData.count++;
        if (requestData.count > limit) {
          // Если лимит превышен, выбросить ошибку
          throw new HttpException('Too many requests', HttpStatus.TOO_MANY_REQUESTS);
        }
      }
    }

    next();
  }
}
