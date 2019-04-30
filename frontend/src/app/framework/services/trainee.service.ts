import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TraineeList } from '../models/TraineeList';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TraineeService {
  url = environment.baseURL;
  constructor(private http: HttpClient) { }

  getAllTrainee(id: number) {
    // return this.http.get<TraineeList>(this.url + '/getAllTrainee/' + id );
    return this.http.get<TraineeList>(this.url + '/getAllTrainee' );
  }
}
