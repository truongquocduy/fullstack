import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/model/course.model';
import { Studying } from 'src/app/model/studying.model';
import { Timeable } from 'src/app/model/timeable.model';
import { User } from 'src/app/model/user.model';
import { AccountService } from 'src/app/services/account.service';
import { CourseService } from 'src/app/services/course.service';
import { StudyingService } from 'src/app/services/studying.service';
import { TimeableService } from 'src/app/services/timeable.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  listStudying:Studying[] = []
  User:User = new User()
  listTimeable:Timeable [] = []
  ExamTarget:any = {
    id:0,
    makh:"",
    name:"",
    lanthi:0
  }
  cau1:String = ""
  constructor(private router:Router,private StudyingService:StudyingService,private accountService:AccountService,private Timeable:TimeableService) { }

  ngOnInit(): void {
    this.loadData()
  }
  logout(){
    Swal.fire({
      title: 'Bạn có thật sự muốn đăng xuất!!!',
      showDenyButton: true,
      iconHtml:'<img src="assets/img/logo.jfif" style="width:100px">',
      showCancelButton: false,
      confirmButtonText: 'Vẫn đăng xuất',
      denyButtonText: `Không`,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("mssv")
        this.router.navigate(['/guest/login'])
      } else if (result.isDenied) {
        Swal.fire({
          position: 'top-end',
          iconHtml:'<img src="assets/img/logo.jfif" style="width:100px">',
          title: 'Bạn đã có một lựa chọn đúng !!!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
  loadData(){
    let massv = JSON.parse(localStorage.getItem("mssv")||"")
    this.StudyingService.getAllStudying(massv).then((res:any)=>{
      this.listStudying =  res
    })
    this.accountService.getAllUser().then((res:any)=>{
      this.User =  res[res.findIndex((item:any)=>item.id == massv)]
      this.Timeable.getAllClassroom(this.User.classroom).then((res:any)=>{
        this.listTimeable = res
      })
    })
 
  }
  clickExamTarget(id:number,makh:String,name:String,lanthi:number){
    this.loadData()
    this.ExamTarget = {
      id:0,
      makh:"",
      name:"",
      lanthi:0
    }
    this.ExamTarget.id = id
    this.ExamTarget.makh = makh
    this.ExamTarget.name = name
    this.ExamTarget.lanthi = lanthi
  }
  Nopbai(event:any){
    var diemthi:any = 0
    if(event.target.cau1.value==1){
      diemthi+=5
    }
    if(event.target.cau2.value==2){
      diemthi+=5
    }
    this.StudyingService.Nopbai(this.ExamTarget.id,this.ExamTarget.lanthi,diemthi).then(()=>{
      this.loadData()
    })

  }
  updateUser(event:any,id:String){
    this.User.name = event.target.hoten.value
    this.User.classroom =  event.target.lop.value
    this.User.gender = event.target.phai.value
    this.User.birth =  event.target.ngaysinh.value
    this.User.address =  event.target.diachi.value
    this.User.phone =  event.target.sdt.value
    this.User.email =  event.target.email.value
    this.accountService.updateUser(this.User.id,this.User).then(()=>{
      this.loadData()
    })
  }
}
