import { Component, OnInit, Input } from '@angular/core';
import { ProviderService } from '../shared/service/provider.service';
import { ITask } from '../shared/model/model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private provider: ProviderService) { }

  @Input() task: ITask;
  @Input() onDeleted: Function;

  deleted = false;

  ngOnInit() {
  }

  delete() {
    this.provider.deleteTask(this.task.id).then(response => {
      this.deleted = true;
      this.onDeleted(this.task.id);
    });
  }

}
