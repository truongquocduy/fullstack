import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/model/blog.model';
import { Course } from 'src/app/model/course.model';
import { User } from 'src/app/model/user.model';
import { AccountService } from 'src/app/services/account.service';
import { BlogService } from 'src/app/services/blog.service';
import { CourseService } from 'src/app/services/course.service';
import { StudyingService } from 'src/app/services/studying.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  listBlog:Blog [] = []
  listUser:User [] = []
  listCourse:Course[] = []
  dataLeftChart:any = [0,0,0,0,0] 
  dataRightChart:any = [0, 0, 0, 0, 0, 0, 0 , 0, 0,0,0,0,     0,0]
  loader:boolean = false
  constructor(private BlogService:BlogService,private AccountService:AccountService,private CourseService:CourseService,private StudyingService:StudyingService) { }
  ChartRight:any = {
    chartType : 'bar',

    chartDatasets : [
      { data: [0, 0, 0, 0, 0, 0, 0 , 0, 0,0,0,0, 0,0], label: 'Doanh thu 2022' }
    ],
  
    chartLabels : ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6','Tháng 7', 'Tháng 8', 'Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
  
    chartColors : [
      {
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2,
      }
    ]
  
    
  }
  ChartLeft:any = {
    chartType : 'polarArea',

    chartDatasets : [
      { data: [0,0,0,0,0], label: 'Xếp loại 2022' }
    ],
  
    chartLabels : ['Xuất sắc', 'Giỏi', 'Khá', 'Trung Bình', 'Yếu'],
  
    chartColors : [
      {
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
      }
    ]
  
    
  }
  chartOptions: any = {
    responsive: true
  };
  
  ngOnInit(): void {
    this.loadData()
  }
  loadData(){
    this.ChartLeft.chartDatasets = [
      { data: [0,0,0,0,0], label: 'Xếp loại 2022' }
    ]
    this.ChartRight.chartDatasets = [
      { data: [0, 0, 0, 0, 0, 0, 0 , 0, 0,0,0,0, 0,0], label: 'Doanh thu 2022' }
    ]
    this.BlogService.getBlogs().then((res:any)=>{
      this.listBlog = res
    })
    this.AccountService.getAllUser().then((res:any)=>{
      this.listUser = res
      this.SetDataLeftChart();
      setTimeout(() => {
        this.ChartLeft.chartDatasets = [
          { data: this.dataLeftChart, label: 'Xếp loại 2022' }
        ]
      }, 500);
    })

    this.CourseService.getAllCourses().then((res:any)=>{
      this.listCourse =  res
      this.setDataRightChart()
      setTimeout(() => {
        this.ChartRight.chartDatasets =[
          { data: this.dataRightChart, label: 'Doanh thu 2022' }
        ]
      }, 500);
    })

  }
  UpdateDiemso(){
    this.loader = true
    this.listUser.forEach((item,index)=>{
      var diemtb_tmp = 0 
      this.StudyingService.getAllStudying(item.id).then((res:any)=>{
        res.forEach((element:any)=>{
          diemtb_tmp += element.thi1 + element.thi2
        })
        setTimeout(() => {
          this.AccountService.updateDiemTBUser(item.id,diemtb_tmp/10).then(()=>{
            if(index == this.listUser.length-1){
              this.loadData()
              this.loader = false

            }

          })
        }, index*1000);
        
      })
    })

  }
  SetDataLeftChart(){

    this.dataLeftChart = [0,0,0,0,0]
    this.listUser.forEach((item:any)=>{
      if(item.diemtb==10){
        this.dataLeftChart[0] +=1 
      }
      if(item.diemtb < 10 && item.diemtb >=8){
        this.dataLeftChart[1] +=1 
      }
      if(item.diemtb < 8 && item.diemtb >=6.5){
        this.dataLeftChart[2] +=1 
      }
      if(item.diemtb < 6.5 && item.diemtb >=5){
        this.dataLeftChart[3] +=1 
      }
      if(item.diemtb <5){
        this.dataLeftChart[4] +=1 
      }
    })
  }
  setDataRightChart(){
    this.dataRightChart = [0, 0, 0, 0, 0, 0, 0 , 0, 0,0,0,0,     0,0]
    this.StudyingService.getAll().then((res:any)=>{
      res.forEach((item:any)=>{
        let year:any = new Date(item.ngaydangky)
        if(year.getFullYear()==2022){
          this.CourseService.getAllCoursesID(item.makhoahoc).then((res:any)=>{
            this.dataRightChart[(year.getMonth())] += res.price
          })
        }
      })
    })
  }
}
