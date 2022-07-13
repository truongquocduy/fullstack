import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Course } from 'src/app/model/course.model';
import { CourseService } from 'src/app/services/course.service';
@Component({
  selector: 'app-studypage',
  templateUrl: './studypage.component.html',
  styleUrls: ['./studypage.component.scss']
})
export class StudypageComponent implements OnInit {
  listCourses: Course[] = []
  course: Course = new Course()
  constructor(private store: Store<{ data: any }>,private coursesservice:CourseService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.coursesservice.getAllCourses().then((res:any)=>{
      this.listCourses = res
    })
  }

  // getCourses(){
  //   this.store.select('data').subscribe((data) => this.listCourses = data )
  // }
}
