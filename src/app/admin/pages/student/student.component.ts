import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Studying } from 'src/app/model/studying.model';
import { User } from 'src/app/model/user.model';
import { AccountService } from 'src/app/services/account.service';
import { StudyingService } from 'src/app/services/studying.service';
import Swal from 'sweetalert2';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  listUser:User [] = []
  UserTarget:User = new User()
  listStudyingTarget:Studying[] =[]
  mssv:String = ""
  password:any = ""
  name:String = ""
  classroom:String = "CD20CT12"
  gender:String = "Nam"
  birth:String=""
  address:String = ""
  phone:String  = ""
  email:String = ""
  newpassword:string = ""
  isChangePassword:boolean = false
  constructor(private AccountService:AccountService,private StudyingService:StudyingService) { }

  ngOnInit(): void {
    this.loadData()
  }
  loadData(){
    this.AccountService.getAllUser().then((res:any)=>{
      this.listUser =  res
    })
  }
  createAccount(){
    const md5 = new Md5()
    const password_md5:any = md5.appendStr(this.password).end()
    this.AccountService.getAllAccount().then((res:any)=>{
      const checkexist = res.findIndex((item:any)=>item.id == this.mssv)
      if(checkexist == -1){
        this.AccountService.createAccount(this.mssv,password_md5)
        const new_user = new User();
        new_user.id = this.mssv
        new_user.name = this.name
        new_user.classroom = this.classroom
        new_user.image = "nam.png"
        new_user.gender = this.gender
        new_user.birth = this.birth
        new_user.address = this.address
        new_user.phone = this.phone
        new_user.email = this.email
        
        this.AccountService.createUser(new_user).then(()=>{
          this.loadData()
          this.mssv = ""
          this.password = ""
          this.name = ""
          this.classroom = "CD20CT12"
          this.gender = "Nam"
          this.birth=""
          this.address = ""
          this.phone  = ""
          this.email = ""
          Swal.fire({
            position: 'top-end',
            iconHtml:'<img src="assets/img/logo.jfif" style="width:100px">',
            title: 'Đã thêm thành công một thành viên mới',
            showConfirmButton: false,
            timer: 1500
          })
        })
      }
      else{
        alert("Tài khoản đã tồn tại!!!")
      }
    })
  }
  deleteAccount(id:String){
    Swal.fire({
      title: 'Admin bạn muốn xóa thành viên sao!!!',
      showDenyButton: true,
      iconHtml:'<img src="assets/img/logo.jfif" style="width:100px">',
      showCancelButton: false,
      confirmButtonText: 'Tôi chắc chắn!!!',
      denyButtonText: `Không`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.AccountService.deleteAccount(id).then(()=>{
          this.AccountService.deleteUser(id).then(()=>{
            this.loadData()
          })
        })
      }
    })
  }
  loadUserID(id:String){
    this.listStudyingTarget = []
    this.AccountService.getAllUser().then((res:any)=>{
      let existUser = res.findIndex((item:any)=>item.id == id)
      console.log(existUser)
      if(existUser != -1){
        this.UserTarget = res[existUser]
        this.StudyingService.getAllStudying(id).then((res:any)=>{
          this.listStudyingTarget = res
        })
      }
    })
  }
  updateUser(event:any,id:String){
    Swal.fire({
      title: 'Admin bạn muốn cập nhật thành viên sao!!!',
      showDenyButton: true,
      iconHtml:'<img src="assets/img/logo.jfif" style="width:100px">',
      showCancelButton: false,
      confirmButtonText: 'Tôi chắc chắn!!!',
      denyButtonText: `Không`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.UserTarget.name = event.target.hoten.value
        this.UserTarget.classroom =  event.target.lop.value
        this.UserTarget.gender = event.target.phai.value
        this.UserTarget.birth =  event.target.ngaysinh.value
        this.UserTarget.address =  event.target.diachi.value
        this.UserTarget.phone =  event.target.sdt.value
        this.UserTarget.email =  event.target.email.value
        this.AccountService.updateUser(id,this.UserTarget).then(()=>{
          if(this.isChangePassword){
            if(this.newpassword.length>0){
              const md5 = new Md5()
              let psmd5:any = md5.appendStr(this.newpassword).end()
              this.AccountService.updateAccount(id,psmd5).then((res:any)=>{
                this.newpassword = ""
                this.loadData()
                this.loadUserID(id)
              })
            }
            else{
              Swal.fire({
                position: 'top-end',
                iconHtml:'<img src="assets/img/logo.jfif" style="width:100px">',
                title: 'Vui lòng không để trống hoặc đóng New password',
                showConfirmButton: false,
                timer: 1500
              })
            }
          }
          this.loadData()
          this.loadUserID(id)
        })
      }
    })
  }
  clickChangePassword(){
    this.isChangePassword =! this.isChangePassword
  }
}
