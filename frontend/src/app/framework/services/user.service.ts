import { UserList } from './../models/UserList';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.baseURL;
  constructor(private http: HttpClient) { }

  getAllUserByProgram(pid: number) {
    return this.http.get<UserList>(this.url + '/getAllUser/' + pid );
  }

  getAllUser() {
    return this.http.get<UserList>(this.url + '/getAllUser');
  }

  getUser(uid: number) {
    return this.http.get<User>(this.url + '/getUser/' + uid);
  }
}
