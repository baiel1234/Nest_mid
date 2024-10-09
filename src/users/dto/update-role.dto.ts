// src/users/dto/update-role.dto.ts
import { IsEnum } from 'class-validator';
import { Role } from '@prisma/client';  // Убедитесь, что Prisma Role подключен

export class UpdateRoleDto {
  @IsEnum(Role)
  role: Role;
}
