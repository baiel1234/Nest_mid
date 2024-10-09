import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateRoleDto } from './dto/update-profile.dto';
import { Role } from './enums/role.enum';  // Импортируем enum Role
import { NotFoundException } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Метод для обновления роли
  async updateUserRole(userId: number, role: Role) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        role: {
          set: role,  // Здесь мы используем специальный объект для обновления enum поля
        },
      },
    });
  }
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }, // Поиск пользователя по email
    });
  }
  async create(registerDto: RegisterDto) {
    return this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: registerDto.password, // Убедитесь, что вы хэшируете пароль перед сохранением
      },
    });
  }
  async getAllUsers() {
    return this.prisma.user.findMany();  // Получаем всех пользователей
  }
}
