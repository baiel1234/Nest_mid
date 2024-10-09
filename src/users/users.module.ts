import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module'; // Импортируем PrismaModule
import { PrismaService } from '../prisma/prisma.service'; 
@Module({
  imports: [PrismaModule], // Подключаем PrismaModule
  providers: [UsersService,PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
