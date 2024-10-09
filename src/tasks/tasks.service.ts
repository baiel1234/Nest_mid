import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        userId,
      },
    });
  }

  async findAll() {
    return this.prisma.task.findMany();
  }

  async findOne(id: number) {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    console.log('Updating task with id:', id);
    console.log('Data:', updateTaskDto);
  
    const task = await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  
    console.log('Updated task:', task);
    return task;
  }
  
  
  
  
  

  async remove(id: number) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}