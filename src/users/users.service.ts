import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Импортируем сервис Prisma
import { RegisterDto } from '../auth/dto/register.dto'; // Импортируй DTO для регистрации
import { User } from '@prisma/client'; // Импортируем тип User из Prisma

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {} // Инжектируем PrismaService

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(registerDto: RegisterDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: registerDto.password, // Пароль уже должен быть хеширован в AuthService
      },
    });
  }

  // Другие методы...
}
