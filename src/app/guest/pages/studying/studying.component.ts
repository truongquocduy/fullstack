import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/model/course.model';
import { CourseService } from 'src/app/services/course.service';
import { StudyingService } from 'src/app/services/studying.service';

@Component({
  selector: 'app-studying',
  templateUrl: './studying.component.html',
  styleUrls: ['./studying.component.scss']
})
export class StudyingComponent implements OnInit {
  Course:Course = new Course()
  numberdown:number = 5
  buttonNext:boolean  = false
  constructor(private route:ActivatedRoute, private CourserService:CourseService,private StudyingService:StudyingService) { }

  ngOnInit(): void {
    this.loadData()
    this.timeDown()
  }
  loadData(){
    let makh:any = this.route.snapshot.paramMap.get('makh')
    // this.Course = this.CourserService.getAllCoursesID(0)
  }
  timeDown(){
    const down  = setInterval(() => {
      this.numberdown--
      if(this.numberdown == 0){
        clearInterval(down);
        this.buttonNext = true
      }
    }, 1000);
  }
  next(){
    this.numberdown = 5
    this.buttonNext = false
    this.timeDown() 
    let makh:any = this.route.snapshot.paramMap.get('makh')
    let massv = JSON.parse(localStorage.getItem("mssv")||"")
    this.StudyingService.getAllStudying(massv).then((res:any)=>{
      let existKH = res.findIndex((item:any)=>item.makhoahoc == makh)
      if(existKH != -1){
        this.StudyingService.updateStudying(res[existKH].id,res[existKH].sobaidahoc+1)
      }
    })
  }

}
