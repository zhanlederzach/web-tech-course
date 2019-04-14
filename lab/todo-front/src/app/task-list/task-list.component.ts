import { Component, OnInit, Input } from '@angular/core';
import { ProviderService } from '../shared/service/provider.service';
import { ITaskList, ITask } from '../shared/model/model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(private provider: ProviderService) { }

  // [] from parent component
  @Input() taskList: ITaskList;
  tasks: ITask[] = [];

  isTaskSelected = false;
  task: ITask = null;

  ngOnInit() {
    this.provider.getTasksOfTaskList(this.taskList.id).then(response => {
      this.tasks = response;
    });
  }

  onTaskClick(task) {
    console.log(task);
    this.isTaskSelected = true;
    this.task = task;
  }
}
