import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/framework/services/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/framework/services/task.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-task-calendar',
  templateUrl: './task-calendar.component.html',
  styleUrls: ['./task-calendar.component.css']
})
export class TaskCalendarComponent implements OnInit {

  events: any[];
  options: any;

  constructor(private service: TaskService, private global: GlobalService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.service.getAllTaskCalendar().subscribe(data => this.events = data.events);

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: Date.now(),
      header: {
          left: 'prev,next,month,agendaWeek,agendaDay',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
      },
      editable: true,
      dateClick: (e) => { console.log(e); }
    };
  }

}
