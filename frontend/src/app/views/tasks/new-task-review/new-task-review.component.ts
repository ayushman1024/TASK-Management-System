import { Component, OnInit, Input } from '@angular/core';
import { NewTask } from 'src/app/framework/models/NewTask';

@Component({
  selector: 'app-new-task-review',
  templateUrl: './new-task-review.component.html',
  styleUrls: ['./new-task-review.component.css']
})
export class NewTaskReviewComponent implements OnInit {

  @Input() newTaskModel: NewTask;
  constructor() { }

  ngOnInit() {
  }

}
