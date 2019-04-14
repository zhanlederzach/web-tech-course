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

  ngOnInit() {
  }

}
