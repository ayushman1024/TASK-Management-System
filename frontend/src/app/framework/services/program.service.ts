import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewProgram } from '../models/NewProgram';
import { ProgramList } from '../models/ProgramList';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  url = environment.baseURL;

  constructor(private http: HttpClient) { }

  create(newProgram: NewProgram) {
    return this.http.post<any>(this.url + '/createProgram', newProgram);
  }

  getAll() {
    return this.http.get<ProgramList>(this.url + '/getAllProgram');
  }
}
