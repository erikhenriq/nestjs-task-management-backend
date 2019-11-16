import { Task, TaskStatus } from './task.model';
import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { CreateTaskDTO } from './dto/create-task-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDTO: CreateTaskDTO) {
    const task: Task = {
      id: uuid(),
      ...createTaskDTO,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }
}
