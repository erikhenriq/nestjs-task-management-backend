import { TasksService } from './tasks.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) { }

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() task: Task): Task {
    return this.taskService.createTask(task.title, task.description);
  }
}
