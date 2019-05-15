import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TaskService } from 'src/app/framework/services/task.service';
import { UserService } from 'src/app/framework/services/user.service';
import { DatePipe } from '@angular/common';
import { GlobalService } from 'src/app/framework/services/global.service';
import { Work } from 'src/app/framework/models/work';

@Component({
  selector: 'app-task-work',
  templateUrl: './task-work.component.html',
  styleUrls: ['./task-work.component.css'],
  providers: [MessageService]
})
export class TaskWorkComponent implements OnInit {

  workModel: Work;
  original: string;
  prgName: string;
  taskName: string;
  constructor(private msg: MessageService, private service: TaskService, private userService: UserService,
              private taskService: TaskService, private datePipe: DatePipe, private global: GlobalService) { }

  ngOnInit() {
    this.service.getWork().subscribe(data => { this.workModel = data; this.original = this.workModel.work; },
          error => { this.workModel = new Work(); this.workModel.work = '';
        });
    this.prgName = this.global.getProgramName();
    this.taskName = this.global.getSelectedTask().name;
  }

  submit() {
    if (this.workModel.work === this.original) {
      this.msg.add({severity: 'warn', summary: 'No Changes', detail: ''});
    } else {
      this.msg.add({severity: 'info', summary: 'Saving Changes', detail: 'Wait'});
      this.service.setWork(this.workModel).subscribe( data => {
        this.msg.add({severity: 'success', summary: 'UPDATED', detail: 'Changes are saved'});
        this.original = this.workModel.work;
      },
      error => {
        this.msg.add({severity: 'error', summary: 'ERROR', detail: 'Cannot save your work'});
      });
    }
  }

}
