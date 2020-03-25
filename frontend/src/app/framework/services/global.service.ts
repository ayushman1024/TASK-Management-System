import { Injectable } from '@angular/core';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  private currentProgramId: number;
  private token: string;
  private uid: number;
  private suid: number;
  private programName: string;
  private logged = false;
  private selectedTask: Task;
  getToken(): string {
    this.token = sessionStorage.getItem('token');
    return this.token;
  }
  setToken(tokenValue: string) {
    this.token = tokenValue;
    sessionStorage.setItem('token', this.token);
  }
  getCurrentProgramId(): number {
    this.currentProgramId = +sessionStorage.getItem('currentProgramID');
    return this.currentProgramId;
  }
  setCurrentProgramId(programId: number) {
    this.currentProgramId = programId;
    sessionStorage.setItem('currentProgramID', '' + this.currentProgramId);
  }
  getUid(): number {
    this.uid = +sessionStorage.getItem('uid');
    return this.uid;
  }
  setUid(uid: number) {
    this.uid = uid;
    sessionStorage.setItem('uid', '' + this.uid);
  }
  getSUid(): number {
    this.suid = +sessionStorage.getItem('suid');
    return this.suid;
  }
  setSUid(suid: number) {
    this.suid = suid;
    sessionStorage.setItem('suid', '' + this.suid);
  }
  getProgramName(): string {
    this.programName = sessionStorage.getItem('programName');
    return this.programName;
  }
  setProgramName(programName: string) {
    this.programName = programName;
    sessionStorage.setItem('programName', this.programName);
  }
  setLogged(v: boolean) {
    if ( !v ) {
      sessionStorage.clear();
      sessionStorage.setItem('logged', 'false');    // again created "logged" sessionstorage item, bcoz it is needed to be checked
    } else {
      sessionStorage.setItem('logged', 'true');
    }
    this.logged = v;
  }
  getLogged(): boolean {
    if ( sessionStorage.getItem('logged') === 'true') { this.logged = true; }
    if ( sessionStorage.getItem('logged') === 'false') { this.logged = false; }
    return this.logged;
  }

  getSelectedTask(): Task {
    return this.selectedTask;
  }
  setSelectedTask(task: Task) {
    this.selectedTask = task;
  }
}
