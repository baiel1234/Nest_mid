import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = []; // Хранилище для задач (временное, в реальном проекте используется база данных)

  create(task: any) {
    this.tasks.push(task);
    return task;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    return this.tasks.find(task => task.id === id);
  }

  update(id: number, updatedTask: any) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex > -1) {
      this.tasks[taskIndex] = { id, ...updatedTask };
      return this.tasks[taskIndex];
    }
    return null;
  }

  remove(id: number) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex > -1) {
      return this.tasks.splice(taskIndex, 1);
    }
    return null;
  }
}
