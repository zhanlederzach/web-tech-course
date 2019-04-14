import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { ITask, ITaskList } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http: HttpClient) {
    super(http);
  }

  getTaskLists(): Promise<ITaskList[]> {
    return this.get('http://localhost:8000/api/task_lists/', {});
  }

  getTaskList(id: number): Promise<ITaskList[]> {
    return this.get(`http://localhost:8000/api/task_lists/${id}/`, {});
  }

  getTasksOfTaskList(id: number): Promise<ITaskList[]> {
    return this.get(`http://localhost:8000/api/task_lists/${id}/tasks/`, {});
  }

  getTasks(id: number): Promise<ITaskList> {
    return this.get(`http://localhost:8000/api/tasks/${id}/`, {});
  }
}
