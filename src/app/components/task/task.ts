import {Component, OnInit}  from 'angular2/core';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'task',
  template: require('./task.html')
  // style: require('./task.css')
})
export class TaskComponent implements OnInit {
  text: string;
  errorMessage: string;

  constructor(private _taskService: TaskService) {
  }

  ngOnInit(): void {
    this._taskService.getGetGuidanceHelpText()
      .subscribe(
        text => this.text = text,
        error => this.errorMessage = <any>error);
  }

}
