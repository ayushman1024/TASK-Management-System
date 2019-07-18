import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Program } from '../../framework/models/Program';
import { ProgramList } from '../../framework/models/ProgramList';
import { ProgramService } from 'src/app/framework/services/program.service';
import { DatePipe } from '@angular/common';
import { GlobalService } from 'src/app/framework/services/global.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-select-prgm',
  templateUrl: './select-prgm.component.html',
  styleUrls: ['./select-prgm.component.css']
})
export class SelectPrgmComponent implements OnInit {

  prgmList = new ProgramList();
  prgms: Program[];
  constructor(private service: ProgramService, private router: Router, private route: ActivatedRoute,
              private datePipe: DatePipe, private global: GlobalService) { }

  ngOnInit() {
    this.service.getAllByUser().subscribe( list => this.prgmList = list);
  }

  selectPrgm(p: Program) {
    this.global.setCurrentProgramId(p.id);
    this.global.setProgramName(p.name);
    this.router.navigate(['./../../t', 'myTasks'], {relativeTo: this.route });
  }
}
