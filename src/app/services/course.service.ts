import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../model/course.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService{
  constructor(httpClient: HttpClient){
    super(httpClient)
  }
  getAllCourses(){
    return this.get('/courses');
  }
  getAllCoursesID(id:any){
    return this.get('/courses/'+id)
  }

}