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
    return this.token;
  }
  setToken(tokenValue: string) {
    this.token = tokenValue;
  }
  getCurrentProgramId(): number {
    return this.currentProgramId;
  }
  setCurrentProgramId(programId: number) {
    this.currentProgramId = programId;
  }
  getUid(): number {
    return this.uid;
  }
  setUid(uid: number) {
    this.uid = uid;
  }
  getSUid(): number {
    return this.suid;
  }
  setSUid(suid: number) {
    this.suid = suid;
  }
  getProgramName(): string {
    return this.programName;
  }
  setProgramName(programName: string) {
    this.programName = programName;
  }
  setLogged(v: boolean) {
    this.logged = v;
  }
  getLogged(): boolean {
    return this.logged;
  }

  getSelectedTask(): Task {
    return this.selectedTask;
  }
  setSelectedTask(task: Task) {
    this.selectedTask = task;
  }
}
