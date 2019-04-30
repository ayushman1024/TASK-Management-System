import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorPageComponent } from './views/error-page/error-page.component';
import { TaskDashboardComponent } from './views/tasks/task-dashboard/task-dashboard.component';
import { TaskCreatorComponent } from './views/tasks/task-creator/task-creator.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

import { MaterialModuleImportModule } from './core/modules/material-module-import.module';
import { PrimengModuleImportModule } from './core/modules/primeng-module-import.module';
import { DatePipe } from '@angular/common';
import { GlobalService } from './framework/services/global.service';
import { HomePageComponent } from './views/home-page/home-page.component';
import { LoginFormComponent } from './views/login-form/login-form.component';
import { NewTaskReviewComponent } from './views/tasks/new-task-review/new-task-review.component';
import { MdashboardComponent } from './views/mdashboard/mdashboard.component';
import { TdashboardComponent } from './views/tdashboard/tdashboard.component';
import { MyTasksComponent } from './views/my-tasks/my-tasks.component';
import { CreateProgramComponent } from './views/create-program/create-program.component';
import { SelectPrgmComponent } from './views/select-prgm/select-prgm.component';
import { MhomeComponent } from './views/mhome/mhome.component';
@NgModule({
   declarations: [
      AppComponent,
      TaskDashboardComponent,
      TaskCreatorComponent,
      ErrorPageComponent,
      HomePageComponent,
      LoginFormComponent,
      LoginComponent,
      RegisterComponent,
      NewTaskReviewComponent,
      MdashboardComponent,
      TdashboardComponent,
      MyTasksComponent,
      CreateProgramComponent,
      SelectPrgmComponent,
      MhomeComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      LayoutModule,
      MaterialModuleImportModule,
      PrimengModuleImportModule,
      ReactiveFormsModule
   ],
   exports: [FormsModule,
  ],
   providers: [DatePipe, GlobalService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
