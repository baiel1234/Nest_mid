import { Controller, Get, Patch, Param, Body, Req, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User , Role} from '@prisma/client';
import { UpdateRoleDto } from './dto/update-role.dto';  // Импортируйте ваш DTO

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('profile')
  async getProfile(@Req() req): Promise<User> {
    return this.usersService.getProfile(req.user.id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() userDto: UserDto): Promise<User> {
    return this.usersService.update(id, userDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.usersService.delete(id);
  }

  @Patch('update-role/:id')
  async updateRole(
    @Param('id') id: string, 
    @Body() updateRoleDto: UpdateRoleDto // Убедитесь, что используете UpdateRoleDto
  ) {
    return await this.usersService.updateRole(Number(id), updateRoleDto);
  }
}
