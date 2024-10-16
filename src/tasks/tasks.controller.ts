import { BadRequestException, Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task,TaskStatus } from '@prisma/client';
import { UpdateTaskDto } from './dto/update-task.dto'; 
import { RateLimit } from 'nestjs-rate-limiter';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @RateLimit({ points: 5, duration: 60 }) // Лимит 5 запросов за 1 минуту
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  // Маршрут для получения задачи по id
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(Number(id));
  }


  @Patch(':id/status') // Здесь важно правильное указание маршрута
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.tasksService.updateTaskStatus(Number(id), updateTaskDto);
  }

  // Метод для удаления задачи
  @Delete(':id')
async deleteTask(@Param('id') id: string): Promise<void> {
  // Преобразуем строковый id в число
  const taskId = Number(id);

  // Если id не является числом, возвращаем ошибку
  if (isNaN(taskId)) {
    throw new BadRequestException('Invalid task ID');
  }

  return this.tasksService.deleteTask(taskId);
}

@Get('filter/:status')
async getFilteredTasks(@Param('status') status: TaskStatus) {
  return this.tasksService.getFilteredTasks(status); // Правильное использование 'tasksService'
}

}
