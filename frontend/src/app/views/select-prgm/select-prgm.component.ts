import { Component, OnInit } from '@angular/core';
import { Program } from '../../framework/models/Program';
import { ProgramList } from '../../framework/models/ProgramList';
import { ProgramService } from 'src/app/framework/services/program.service';
import { DatePipe } from '@angular/common';
import { GlobalService } from 'src/app/framework/services/global.service';

@Component({
  selector: 'app-select-prgm',
  templateUrl: './select-prgm.component.html',
  styleUrls: ['./select-prgm.component.css']
})
export class SelectPrgmComponent implements OnInit {

  prgmList = new ProgramList();
  prgms: Program[];
  constructor(private service: ProgramService,
              private datePipe: DatePipe, private global: GlobalService) { }

  ngOnInit() {
    this.service.getAll().subscribe( list => this.prgmList = list);
    this.prgms = this.prgmList.programList;
  }

  selectPrgm(p: Program) {
    console.log('Selected Program: ', p);
    this.global.setCurrentProgramId(p.id);
  }
}
