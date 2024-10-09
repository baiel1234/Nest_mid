import { IsEnum } from 'class-validator';
import { Role } from '../enums/role.enum' // импортируйте вашу роль

export class UpdateRoleDto {
  @IsEnum(Role)
  role: 'ADMIN'; // или string, если роли - это строки
}