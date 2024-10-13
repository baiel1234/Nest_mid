import { IsOptional, IsEnum } from 'class-validator';
import { TaskStatus } from '@prisma/client'; // Убедитесь, что TaskStatus импортирован

export class UpdateTaskDto {
  @IsOptional()
  @IsEnum(TaskStatus) // Используем перечисление TaskStatus
  status?: TaskStatus; // Замените string на TaskStatus
}
