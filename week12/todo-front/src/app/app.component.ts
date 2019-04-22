import { Component, OnInit } from '@angular/core';
import { ProviderService } from './shared/service/provider.service';
import { ITaskList, ITask } from './shared/model/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo-front';

  taskLists = Array<ITaskList>();

  // state:
  // list <- shows tasklists
  // tasklist <- shows selected takslist
  // task <- shows selected task

  state = 'list';
  taskList: ITaskList = null;

  // providerService injection
  constructor(private provider: ProviderService) { }

  ngOnInit(): void {
    this.provider.getTaskLists().then(response => {
      this.taskLists = response;
      console.log(this.taskLists);
    }).catch(error => {
      alert(error);
    });
  }

  onTaskListClick(taskList: ITaskList): void {
    this.state = 'list';
    setTimeout(() => {
      this.state = 'taskList';
      this.taskList = taskList;
    }, 50);
  }

  isList(): boolean {
    return this.state === 'list';
  }

  isTaskList(): boolean {
    return this.state === 'taskList';
  }

  isTask(): boolean {
    return this.state === 'task';
  }
}
