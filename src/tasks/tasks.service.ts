import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from '@prisma/client';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, status, userId } = createTaskDto;

    return this.prisma.task.create({
      data: {
        title,
        description,
        status,
        user: {
          connect: {
            id: userId, // Подключаем пользователя к задаче
          },
        },
      },
    });
  }
  

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async updateTaskStatus(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { status } = updateTaskDto;

    const task = await this.prisma.task.update({
      where: { id },
      data: { status },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  // Логика удаления задачи
  async deleteTask(id: number): Promise<void> {
    try {
      await this.prisma.task.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('Task not found');
    }
  }
  }

