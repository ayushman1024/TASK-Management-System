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
import { NewTaskReviewComponent } from './views/tasks/new-task-review/new-task-review.component';
import { TdashboardComponent } from './views/tdashboard/tdashboard.component';
import { MyTasksComponent } from './views/tasks/my-tasks/my-tasks.component';
import { CreateProgramComponent } from './views/create-program/create-program.component';
import { SelectPrgmComponent } from './views/select-prgm/select-prgm.component';
import { UdashboardComponent } from './views/udashboard/udashboard.component';
import { EnterProgramComponent } from './views/enter-program/enter-program.component';
import { AuthInterceptor, httpInterceptorProviders } from './framework/auth/auth-interceptor';
@NgModule({
   declarations: [
      AppComponent,
      TaskDashboardComponent,
      TaskCreatorComponent,
      ErrorPageComponent,
      LoginComponent,
      RegisterComponent,
      NewTaskReviewComponent,
      TdashboardComponent,
      MyTasksComponent,
      CreateProgramComponent,
      SelectPrgmComponent,
      UdashboardComponent,
      EnterProgramComponent,
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
   providers: [DatePipe, GlobalService, httpInterceptorProviders],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
