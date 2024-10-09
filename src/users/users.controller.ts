import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateRoleDto } from './dto/update-profile.dto'; // Убедитесь, что DTO импортируется правильно
import { Role } from './enums/role.enum';  // Импортируем enum Role

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('update-role/:id')
  async updateRole(@Param('id') id: string, @Body('role') role: Role) {
    return this.usersService.updateUserRole(+id, role);
  }
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}

