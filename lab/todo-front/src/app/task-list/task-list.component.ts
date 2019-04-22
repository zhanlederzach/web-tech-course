import { Component, OnInit, Input } from '@angular/core';
import { ProviderService } from '../shared/service/provider.service';
import { ITaskList, ITask } from '../shared/model/model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  private taskCreate: boolean;

  constructor(private provider: ProviderService) { }

  // [] from parent component
  @Input() taskList: ITaskList;
  tasks: ITask[] = [];

  isTaskSelected = false;
  task: ITask = null;

  deleted = [];

  onDeletedTask(id) {
    this.deleted.push(id);
  }

  public afterCreatedCallback() {
    console.log('afterCreatedCallback');
  }

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

  createTask() {
    this.taskCreate = true;

  }

  isTaskCreating(): boolean {
    return this.taskCreate;
  }

  isDeleted(id: number) {
    return this.deleted.filter((deletedId) => deletedId === id).length !== 0;
  }
}
