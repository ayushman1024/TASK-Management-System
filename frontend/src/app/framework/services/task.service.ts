import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewTask } from './../models/NewTask';
import { Task } from '../models/Task';
import { TaskRecordList } from './../models/TaskRecordList';
import { TaskList } from '../models/TaskList';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url = environment.baseURL;
  constructor(private http: HttpClient) { }

  create(newTask: NewTask) {
    return this.http.post<any>(this.url + '/createTask', newTask);
  }

  getTaskById(id: number) {
    return this.http.get<Task>(this.url + '/getTaskById/' + id);
  }
  getallTaskByTrainee(id: number) {
    return this.http.get<TaskList>(this.url + '/getAllTaskByTrainee/' + id);
  }
  getallTaskRecordByTrainee(id: number) {
    return this.http.get<TaskRecordList>(this.url + '/getAllTaskRecordByTrainee/' + id);
  }
}
