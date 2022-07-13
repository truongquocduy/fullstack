import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  PathTarget:any = ""
  constructor(private router:Router) {}

  ngOnInit(): void {
   
  }
  logout(){
    Swal.fire({
      title: 'Admin bạn muốn rời khỏi đây sao!!!',
      showDenyButton: true,
      iconHtml:'<img src="assets/img/logo.jfif" style="width:100px">',
      showCancelButton: false,
      confirmButtonText: 'Tôi chắc chắn!!!',
      denyButtonText: `Không`,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token_admin");
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Đăng xuất thành công!!!',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin/login'])
      }
    })
  }
  
}
