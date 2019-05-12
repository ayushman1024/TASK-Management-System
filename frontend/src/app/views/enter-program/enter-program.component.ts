import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/framework/services/program.service';

@Component({
  selector: 'app-enter-program',
  templateUrl: './enter-program.component.html',
  styleUrls: ['./enter-program.component.css']
})
export class EnterProgramComponent implements OnInit {

  passcode: string;
  constructor(private prgService: ProgramService) { }

  ngOnInit() {
  }
  send() {
    this.prgService.enterPass(this.passcode).subscribe(data => {}, error => {});
  }
}
