import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Timeable } from '../model/timeable.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TimeableService extends BaseService{
  constructor(private httpClient: HttpClient) {
    super(httpClient)
   }
  getAll(){
    return this.get('/schedules');
  }
  getAllClassroom(classroom:String){
    return this.get('/schedules?lop=' + classroom)
  }
}
