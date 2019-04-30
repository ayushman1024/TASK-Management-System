import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TaskDashboardComponent } from './views/tasks/task-dashboard/task-dashboard.component';
import { TaskCreatorComponent } from './views/tasks/task-creator/task-creator.component';
import { ErrorPageComponent } from './views/error-page/error-page.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { TdashboardComponent } from './views/tdashboard/tdashboard.component';
import { MdashboardComponent } from './views/mdashboard/mdashboard.component';
import { MyTasksComponent } from './views/my-tasks/my-tasks.component';
import { CreateProgramComponent } from './views/create-program/create-program.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'errorPage', component: ErrorPageComponent },
  { path: 't',
    component: TdashboardComponent,
    children: [
      {
        path: 'myTasks',
        component: MyTasksComponent ,
      }
    ]
   },
  { path: 'm',
    component: MdashboardComponent,
    children: [
      {
        path: 'taskCreate',
        component: TaskCreatorComponent
      },
      {
        path: 'createProgram',
        component: CreateProgramComponent
      }]
    },
];

export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
