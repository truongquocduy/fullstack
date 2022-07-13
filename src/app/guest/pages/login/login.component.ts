import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import Swal from 'sweetalert2';
import {Md5} from 'ts-md5/dist/md5';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  id:String=""
  loginid:String=""
  loginpassword:any
  constructor(private AccountService:AccountService,private router:Router) { }

  ngOnInit(): void {
  }
  login(){
    if(this.loginid != "" && this.loginid!=""){
      const md5 = new Md5()
      var ps:any = md5.appendStr(this.loginpassword).end()
      this.AccountService.getAllAccount().then((res:any)=>{
        if(res.findIndex((item:any)=>item.id == this.loginid && item.password == ps)!=-1){
          localStorage.setItem("mssv",JSON.stringify(this.loginid))
          this.router.navigate(['/guest/profile'])
          Swal.fire({ 
            position: 'top-end',
            icon: 'success',
            title: 'Chào mừng bạn đã trở lại!!!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else{
          Swal.fire(
            'MSSV hoặc mật khẩu không tồn tại!!!',
            'Vui lòng đăng nhập lại!!!',
            'warning'
          )
        }

      })
    }
    else{
      Swal.fire(
        'Các mục không được bỏ trống!!!',
        'Vui lòng đăng nhập lại!!!',
        'warning'
      )
      this.loginid =""
      this.loginpassword=""
    }
  }
}
