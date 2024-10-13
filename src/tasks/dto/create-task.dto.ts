import { IsString, IsEnum, IsNumber } from 'class-validator';
import { TaskStatus } from '@prisma/client';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsNumber()
  userId: number; // Добавляем поле userId
}
