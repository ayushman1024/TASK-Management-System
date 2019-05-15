import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/framework/services/program.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-enter-program',
  templateUrl: './enter-program.component.html',
  styleUrls: ['./enter-program.component.css'],
  providers: [MessageService]
})
export class EnterProgramComponent implements OnInit {

  passcode: string;
  constructor(private msg: MessageService, private prgService: ProgramService) { }

  ngOnInit() {
  }
  send() {
    this.prgService.enterPass(this.passcode).subscribe(data => {
      this.msg.add({severity: 'success', summary: 'Service Message', detail: 'You are now member of this program'});
    }, error => {
      this.msg.add({severity: 'error', summary: 'Service Message', detail: 'Wrong Passcode'});
    });
  }
}
