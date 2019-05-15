import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskCreatorComponent } from './views/tasks/task-creator/task-creator.component';
import { ErrorPageComponent } from './views/error-page/error-page.component';
import { TdashboardComponent } from './views/tdashboard/tdashboard.component';
import { MyTasksComponent } from './views/tasks/my-tasks/my-tasks.component';
import { CreateProgramComponent } from './views/create-program/create-program.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { SelectPrgmComponent } from './views/select-prgm/select-prgm.component';
import { UdashboardComponent } from './views/udashboard/udashboard.component';
import { EnterProgramComponent } from './views/enter-program/enter-program.component';
import { TaskCalendarComponent } from './views/tasks/task-calendar/task-calendar.component';
import { TaskWorkComponent } from './views/tasks/task-work/task-work.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'errorPage', component: ErrorPageComponent },

  { path: 'u',
    component: UdashboardComponent,
    children: [
      { path: 'prg', component: SelectPrgmComponent },
      { path: 'enterPrg', component: EnterProgramComponent },
      { path: 'createProgram', component: CreateProgramComponent }
    ]
   },
  { path: 't',
    component: TdashboardComponent,
    children: [
      { path: 'taskCreate', component: TaskCreatorComponent },
      { path: 'myTasks', component: MyTasksComponent },
      { path: 'cal', component: TaskCalendarComponent },
      { path: 'wrk', component: TaskWorkComponent }
    ]
   }
];

export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
