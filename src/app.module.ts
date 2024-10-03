import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';  // Если у тебя есть модуль задач
import { PrismaModule } from './prisma/prisma.module'; // Импортируй PrismaModule
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule,PrismaModule , AuthModule, TasksModule],  // Добавляем модули
})
export class AppModule {}
