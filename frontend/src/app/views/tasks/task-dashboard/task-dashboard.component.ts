import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent implements OnInit {
  items: MenuItem[];
  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'Task',
        icon: 'pi pi-fw pi-briefcase',
        items: [
            {
              label: 'Create New Task',
              icon: 'pi pi-fw pi-pencil',
              routerLink: './taskCreate'
            },
            {
              label: 'Show All Task',
              icon: 'pi pi-fw pi-list',
              routerLink: './taskCreate'
            },
            {
              label: 'Delete',
              icon: 'pi pi-fw pi-trash',
              routerLink: './taskCreate',
              command: (ev) => console.log('clicked')
            }
        ]
    }];
}

}
