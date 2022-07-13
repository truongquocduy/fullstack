import { Component, OnInit } from '@angular/core';
import { StudyingService } from 'src/app/services/studying.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  loader:boolean = false
  constructor(private StudyingService:StudyingService) { }

  ngOnInit(): void {

  }
  OpenExam(lanthi:number){
    this.loader = true
    this.StudyingService.getAll().then((res:any)=>{
      res.forEach((item:any,index:number)=>{
        setTimeout(() => {
          this.StudyingService.OpenExam(item.id,lanthi)
          if(index == res.length-1)
            this.loader = false
        }, index*1000);
      })
      
    })
  }
  OffExam(lanthi:number){
    this.loader = true
    this.StudyingService.getAll().then((res:any)=>{
      res.forEach((item:any,index:number)=>{
        setTimeout(() => {
          this.StudyingService.OffExam(item.id,lanthi)
          if(index == res.length-1)
            this.loader = false
        }, index*1000);
      })
    })
  }

}
