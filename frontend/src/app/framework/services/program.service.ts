import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewProgram } from '../models/NewProgram';
import { ProgramList } from '../models/ProgramList';
import { GlobalService } from './global.service';
import { CodeDTO } from '../models/CodeDTO';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER } from '@angular/cdk/overlay/typings/overlay-directives';

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

  getAllByUser() {
    return this.http.get<ProgramList>(this.url + '/getAllProgramByUser/' + this.global.getUid());
  }
  enterPass(code: string) {
    const dto = new CodeDTO();
    dto.code = code;
    dto.uid = this.global.getUid();
    return this.http.post<any>(this.url + '/enterPrg', dto);
  }
}
