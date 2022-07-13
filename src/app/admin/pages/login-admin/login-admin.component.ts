import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {
  username:String = ""
  password:String = ""
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  login(){
    if(this.username=="admin" && this.password == "123"){
      localStorage.setItem("token_admin",JSON.stringify("true"));
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Chào mừng admin đã trở lại!!!',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/admin'])
    }
    else{
      Swal.fire(
        'Username hoặc mật khẩu không tồn tại!!!',
        'Vui lòng đăng nhập lại!!!',
        'warning'
      )
    }
  }
}
