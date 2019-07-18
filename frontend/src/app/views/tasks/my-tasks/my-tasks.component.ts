import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TaskService } from 'src/app/framework/services/task.service';
import { DatePipe } from '@angular/common';
import { GlobalService } from 'src/app/framework/services/global.service';
import { TaskRecord } from 'src/app/framework/models/TaskRecord';
import { Task } from 'src/app/framework/models/Task';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
/**
 * This Component Lists all the Tasks Of Trainee.
 */
export class MyTasksComponent implements OnInit {
  @ViewChild('desc') desc: ElementRef;
  @ViewChild('dialog') dialog: ElementRef;

  taskRecordList: TaskRecord[];
  taskList: Task[];
  list = [];
  descDialogVisible = false;
  dialogDescData = '';
  constructor(private service: TaskService, private router: Router, private route: ActivatedRoute,
              private datePipe: DatePipe, private global: GlobalService) {
  }

  ngOnInit() {
    this.service.getallTaskByUser().subscribe(tr => this.taskList = tr.taskList );
  }

  descHover(t) {
    const child = document.createElement('div');
    this.dialogDescData = t.description;
    child.innerHTML = this.dialogDescData;
    this.desc.nativeElement.innerHTML = '';
    this.desc.nativeElement.appendChild(child);
  }

  appendChild(source, target) {
    target.appendChild(source);
  }

  toggleDescDialog() {
    if (this.descDialogVisible) {
      this.descDialogVisible = false;
    } else {
    this.descDialogVisible = true;
    }
  }

  loadDialogData() {
    const child = document.createElement('div');
    child.innerHTML = this.dialogDescData;
    this.dialog.nativeElement.innerHTML = '';
    this.dialog.nativeElement.appendChild(child);
  }

  isLate(t: Task): boolean {
    if (new Date (t.deadline) < new Date()) {
      return true;
    }
    return false;
  }

  taskWork(task: Task) {
    this.global.setSelectedTask(task);
    this.router.navigate(['./t/wrk']);
  }
}
