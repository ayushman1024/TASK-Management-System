import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  private currentProgramId: number;
  private token: string;
  private mid: number;
  private tid: number;

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
  getMid(): number {
    return this.mid;
  }
  setMid(mid: number) {
    this.mid = mid;
  }
  getTid(): number {
    return this.tid;
  }
  setTid(tid: number) {
    this.tid = tid;
  }
}
