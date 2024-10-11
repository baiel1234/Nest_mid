import { Injectable, NotFoundException,BadRequestException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { User, Role } from '@prisma/client'; // Импортируем тип User из @prisma/client
import { UpdateRoleDto } from './dto/update-role.dto'; // DTO для обновления роли

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: UserDto): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
      },
    });
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getProfile(userId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, userDto: UserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        email: userDto.email,
        password: userDto.password,
      },
    });
    return user;
  }

  async delete(id: string): Promise<void> {
    const userId = parseInt(id, 10); // Преобразование строки в число
  
    const user = await this.prisma.user.delete({
      where: { id: userId }, // Убедитесь, что id является числом
    });
  }
  
  
  

  async updateRole(userId: number, updateRoleDto: UpdateRoleDto) {
    const { role } = updateRoleDto;

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
