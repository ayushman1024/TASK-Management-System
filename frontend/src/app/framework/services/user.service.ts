import { UserList } from './../models/UserList';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.baseURL;
  constructor(private http: HttpClient, private global: GlobalService) { }

  getAllUserByProgram() {
    return this.http.get<UserList>(this.url + '/getAllUser/' + this.global.getCurrentProgramId());
  }

  getAllUser() {
    return this.http.get<UserList>(this.url + '/getAllUser');
  }

  getUser(uid: number) {
    return this.http.get<User>(this.url + '/getUser/' + uid);
  }
}
