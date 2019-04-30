import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/framework/models/Task';
import { NewTask } from 'src/app/framework/models/NewTask';
import { TaskService } from 'src/app/framework/services/task.service';
import { DatePipe } from '@angular/common';
import { GlobalService } from 'src/app/framework/services/global.service';
import { TraineeService } from 'src/app/framework/services/trainee.service';
import { Trainee } from 'src/app/framework/models/Trainee';

@Component({
  selector: 'app-task-creator',
  templateUrl: './task-creator.component.html',
  styleUrls: ['./task-creator.component.css']
})
export class TaskCreatorComponent implements OnInit {

  showReview = false;
///
  sourceTrainee: Trainee[];
  assignedTrainee: Trainee[];
///
  taskModel = new Task();
  newTaskModel = new NewTask();
  lastStepIndex: number;
  selectedIndex: number;
  stepSize: number;
///
  reviewIndex = 3;
  assignIndex = 2;
///
  isLinear = true;
  constructor(private service: TaskService, private traineeService: TraineeService,
              private datePipe: DatePipe, private global: GlobalService) {
  }

  ngOnInit() {
    this.global.setCurrentProgramId(0);
    this.traineeService.getAllTrainee(this.global.getCurrentProgramId()).subscribe( res => this.sourceTrainee = res.traineeList);
    this.assignedTrainee = [];
    //
    this.lastStepIndex = 4;
    this.stepSize = 5;
  }

  prepareForReview() {
    this.newTaskModel.trainee = [];
    this.assignedTrainee.forEach(t => {console.log(this.newTaskModel.trainee); this.newTaskModel.trainee.push(t.id); });
    this.taskModel.createdBy = 0;  // fake
    this.taskModel.programId = 0;  // fake
    this.taskModel.modifiedBy = 0; // fake
    this.taskModel.status = 'created';

    this.taskModel.modifiedTime = this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm');
    this.taskModel.createdTime = this.datePipe.transform(Date.now(), 'yyyy-MM-dd HH:mm');
    try {
      this.taskModel.startTime = this.taskModel.startTime.replace('T', ' ');
      this.taskModel.deadline = this.taskModel.deadline.replace('T', ' ') ;
      this.taskModel.createdTime = this.taskModel.createdTime.replace('T', ' ') ;
      this.taskModel.modifiedTime = this.taskModel.modifiedTime.replace('T', ' ');
    } catch (error) {
      console.log('Wrong format datetime-local');
    }
    this.newTaskModel.task = this.taskModel;
  }

  initialize() {
    this.prepareForReview();
  }

  onPublish() {
    this.service.create(this.newTaskModel).subscribe();
  }

  stepChange(ev) {
    if ( ev.selectedIndex === this.reviewIndex) {
      this.showReview = true;
      const child = document.createElement('div');
      child.innerHTML = this.taskModel.description;
      document.getElementById('decriptionBox').innerHTML = '';  // empty earlier values
      document.getElementById('decriptionBox').appendChild(child);
    } else {
      this.showReview = false;
    }
    if ( ev.selectedIndex === this.assignIndex) {
      this.assignedTrainee = [];
      this.newTaskModel.trainee = [];
      this.traineeService.getAllTrainee(this.global.getCurrentProgramId()).subscribe( res => this.sourceTrainee = res.traineeList);
    }
  }
}

