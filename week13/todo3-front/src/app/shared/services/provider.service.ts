import {EventEmitter, Injectable} from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {ITaskList, ITask, IAuthResponse, IPost} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  public sendMessage = new EventEmitter<string>();
  private urlRoot = 'http://localhost:8000/api2';

  constructor(http: HttpClient) {
    super(http);
  }

  normalDates(body: any): any {
    const date_fields = ['due_on', 'created_at'];
    for (let dateField of date_fields) {
      if (body.hasOwnProperty(dateField)) {
        body[dateField] = this.formatDate(body[dateField]);
      }
    }
  }

  getTask(id: number): Promise<ITask> {
    return this.get(`${this.urlRoot}/tasks/${id}/`, {});
  }

  getTaskList(id: number): Promise<ITaskList[]> {
    return this.get(`${this.urlRoot}/task_lists/${id}/`, {});
  }

  getTaskLists(): Promise<ITaskList[]> {
    return this.get(`${this.urlRoot}/task_lists/`, {});
  }

  createTaskList(name: any): Promise<ITaskList> {
    return this.post(`${this.urlRoot}/task_lists/`, {
      name: name
    });
  }

  deleteTaskList(task_lists: ITaskList) {
    return this.delete(`${this.urlRoot}/task_lists/${task_lists.id}/`, {});
  }

  updateTaskList(task_list: ITaskList): Promise<ITaskList> {
    return this.put(`${this.urlRoot}/task_lists/${task_list.id}/`, {
      name: task_list.name
    });
  }

  updateTask(task: ITask): Promise<ITask> {
    return this.put(`${this.urlRoot}/tasks/${task.id}/`, {
      name: task.name,
      created_at: task.created_at,
      due_on: task.due_on,
      status: task.status
    });
  }

  getTasksOfTaskList(id: number): Promise<ITask[]> {
    return this.get(`${this.urlRoot}/task_lists/${id}/tasks/`, {});
  }

  createTask(task_lists: ITaskList, task: ITask): Promise<any> {
    let body = this.normalBody({
      name: task.name,
      created_at: new Date(task.created_at),
      status: task.status,
      due_on: new Date(task.due_on),
    });

    return this.http.post(`${this.urlRoot}/task_lists/${task_lists.id}/tasks/`, body)
      .toPromise().then(res => res);
  }

  deleteTask(task: ITask) {
    return this.delete(`${this.urlRoot}/tasks/${task.id}/`, {});
  }

  auth(login: string, password: string): Promise<IAuthResponse> {
    return this.post('http://localhost:8000/api/login/', {
      username: login,
      password: password
    });
  }

  logout(): Promise<any> {
    return this.post('http://localhost:8000/api/logout/', {});
  }
}
