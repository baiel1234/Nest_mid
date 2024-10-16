import { Module, MiddlewareConsumer, NestModule  } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService  } from '../prisma/prisma.service'; // Подключение Prisma
import { TaskRateLimiterMiddleware } from '../rate-limiter.middleware';

@Module({
  controllers: [TasksController],
  providers: [TasksService, PrismaService],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TaskRateLimiterMiddleware)
      .forRoutes(TasksController); // Применяем лимит для всех маршрутов TaskController
  }
}
