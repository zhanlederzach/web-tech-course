import {Component, Input, OnInit} from '@angular/core';
import {ProviderService} from '../shared/service/provider.service';
import {ITask, ITaskList} from '../shared/model/model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private provider: ProviderService) { }

  @Input()
  public afterCreatedCallback: Function;

  @Input()
  public taskList: ITaskList;

  taskName: string;

  ngOnInit() {
  }

  create() {
    const task: ITask = {
      id: 0,
      name: this.taskName,
      status: `TODO`,
      task_list_id: this.taskList.id
    };
    this.provider.createTask(task).then(response => {
      console.log(response);
      this.afterCreatedCallback();
    });
  }
}
