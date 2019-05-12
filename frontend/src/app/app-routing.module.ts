import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskCreatorComponent } from './views/tasks/task-creator/task-creator.component';
import { ErrorPageComponent } from './views/error-page/error-page.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { TdashboardComponent } from './views/tdashboard/tdashboard.component';
import { MdashboardComponent } from './views/mdashboard/mdashboard.component';
import { MyTasksComponent } from './views/my-tasks/my-tasks.component';
import { CreateProgramComponent } from './views/create-program/create-program.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { SelectPrgmComponent } from './views/select-prgm/select-prgm.component';
import { UdashboardComponent } from './views/udashboard/udashboard.component';
import { EnterProgramComponent } from './views/enter-program/enter-program.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'home', component: HomePageComponent },
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
