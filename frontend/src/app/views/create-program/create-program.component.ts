import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { GlobalService } from 'src/app/framework/services/global.service';
import { ProgramService } from '../../framework/services/program.service';
import { NewProgram } from '../../framework/models/NewProgram';
import { User } from 'src/app/framework/models/user';
import { UserService } from 'src/app/framework/services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-program',
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.css'],
  providers: [MessageService]
})
export class CreateProgramComponent implements OnInit {
  sourceUser: User[];
  assignedUser: User[];
  newProgram = new NewProgram();
  isLinear = true;

  constructor(private msg: MessageService, private service: ProgramService, private userService: UserService,
              private datePipe: DatePipe, private global: GlobalService) {}

  ngOnInit() {
    this.global.setCurrentProgramId(0);
    this.userService.getAllUser().subscribe( res => this.sourceUser = res.userList);
    this.assignedUser = [];
  }
  stepChange(ev) {
    if ( ev.selectedIndex) {
    }
  }

  onSubmit() {
    if ((this.newProgram.name.length > 2) && this.newProgram.description.length > 0) {
      this.newProgram.users = [];
      this.assignedUser.forEach(u => {this.newProgram.users.push(u.id); });
      this.newProgram.admin = this.global.getUid();
      this.service.create(this.newProgram).subscribe();
    } else {
      if (!(this.newProgram.name.length > 2)) {
        this.msg.add({severity: 'error', summary: 'Invalid Name', detail: 'Name field is blank'});
      }
      if (!this.newProgram.description) {
        this.msg.add({severity: 'error', summary: 'Invalid Description', detail: 'No description is provided'});
      }
    }

  }

}
