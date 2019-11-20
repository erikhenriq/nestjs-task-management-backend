import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { CreateTaskDTO } from './dto/create-task-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskWithFilters(filterDTO: GetTasksFilterDTO): Task[] {
    const { status, search } = filterDTO;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(task => task.title.includes(search)
        || task.description.includes(search));
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id);
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  deleteTask(id: string) {
    const found = this.getTaskById(id);

    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
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
