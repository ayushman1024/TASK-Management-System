import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewProgram } from '../models/NewProgram';
import { ProgramList } from '../models/ProgramList';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  url = environment.baseURL;
  constructor(private http: HttpClient, private global: GlobalService) { }

  create(newProgram: NewProgram) {
    return this.http.post<any>(this.url + '/createProgram/' + this.global.getUid(), newProgram);
  }
  getAll() {
    return this.http.get<ProgramList>(this.url + '/getAllProgram');
  }
  getAllByAdmin(id: number) {
    return this.http.get<ProgramList>(this.url + '/getAllProgramByAdmin/' + id);
  }
  enterPass(code: string) {
    return this.http.post<any>(this.url + '/enterPrg/' + this.global.getUid(), code);
  }
}
