import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewTask } from './../models/NewTask';
import { Task } from '../models/Task';
import { TaskRecordList } from './../models/TaskRecordList';
import { TaskList } from '../models/TaskList';
import { GlobalService } from './global.service';
import { TaskCalendarList } from '../models/TaskCalendarList';
import { Work } from '../models/work';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url = environment.baseURL;
  constructor(private http: HttpClient, private global: GlobalService) { }

  create(newTask: NewTask) {
    return this.http.post<any>(this.url + '/createTask', newTask);
  }

  getWork() {
    const path = this.url + '/getTaskWork/' + this.global.getCurrentProgramId() + '/' +
        this.global.getUid() + '/' + this.global.getSelectedTask().id.toString();
    return this.http.get<Work>(path);
  }
  setWork(work: Work) {
    const path = this.url + '/addTaskWork/' + this.global.getCurrentProgramId() + '/' +
        this.global.getUid() + '/' + this.global.getSelectedTask().id;
    return this.http.post<any>(path, work);
  }
  getTaskById(id: number) {
    return this.http.get<Task>(this.url + '/getTaskById/' + id);
  }
  getallTaskByUser() {
    return this.http.get<TaskList>(this.url + '/getAllTaskByUser/' + this.global.getCurrentProgramId() + '/' + this.global.getUid());
  }
  getallTaskRecordByUser(id: number) {
    const path = this.url + '/getAllTaskRecordByUser/' + this.global.getCurrentProgramId() + '/' + this.global.getUid();
    return this.http.get<TaskRecordList>(path);
  }
  getAllTaskCalendar() {
    const path = this.url + '/getTaskCalendar/' + this.global.getCurrentProgramId() + '/' + this.global.getUid();
    return this.http.get<TaskCalendarList>(path);
  }
}
