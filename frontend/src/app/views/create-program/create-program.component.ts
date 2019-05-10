import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { GlobalService } from 'src/app/framework/services/global.service';
import { ProgramService } from '../../framework/services/program.service';
import { NewProgram } from '../../framework/models/NewProgram';

@Component({
  selector: 'app-create-program',
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.css']
})
export class CreateProgramComponent implements OnInit {

  newProgram = new NewProgram();
  isLinear = true;

  constructor(private service: ProgramService,
              private datePipe: DatePipe, private global: GlobalService) {}

  ngOnInit() {
  }
  stepChange(ev) {
    if ( ev.selectedIndex) {
    }
  }

  onPublish() {
    this.service.create(this.newProgram).subscribe();
  }
}
