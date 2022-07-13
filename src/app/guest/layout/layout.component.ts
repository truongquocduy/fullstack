import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Blog } from 'src/app/model/blog.model';
import { Cart } from 'src/app/model/cart.model';
import { Course } from 'src/app/model/course.model';
import { Studying } from 'src/app/model/studying.model';
import { BlogService } from 'src/app/services/blog.service';
import { CourseService } from 'src/app/services/course.service';
import { StudyingService } from 'src/app/services/studying.service';
import { deleteCart } from 'src/app/store.action';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  cart:Cart[] = []
  cartTotal:number = 0
  listMyStudying:Studying[] = []
  listAllBlog:Blog [] = []
  listAllCourses:Course [] = []
  searchString:String = ""
  constructor(private CoursesService:CourseService,private store: Store<{ cart: any }>,private StudyingService:StudyingService,private BlogService:BlogService,private router:Router) {

  }
  ngOnInit(): void {
    this.getData()
    
  }
  getData(){
    this.store.select('cart').subscribe((data) => {
      this.cart = data 
      this.getTotal()
    })
    

  }
  search(){
    
    this.listAllBlog = []
    this.listAllCourses = []
    if(this.searchString !=""){
      this.CoursesService.getAllCourses().then((res:any)=>{
        this.listAllCourses = res
        this.listAllCourses = this.listAllCourses.filter(item=>item.name.toLocaleUpperCase().includes(this.searchString.toLocaleUpperCase()))
      })
      this.BlogService.getBlogs().then((res:any)=>{
        this.listAllBlog = res
        this.listAllBlog = this.listAllBlog.filter(item=>item.tieude.toLocaleUpperCase().includes(this.searchString.toLocaleUpperCase()))
      })
    }
    else{
      this.listAllBlog = []
      this.listAllCourses = []
    }
  }
  deleteCart(stt:number){
    this.store.dispatch(deleteCart({stt: stt}));
  }
  getTotal(){
    var total = 0
    this.cart.forEach(ele=>{
      total+=ele.price
    })
    this.cartTotal = total
  }
  checkout(){
    if(Array.isArray(JSON.parse(localStorage.getItem("mssv") || "[]"))){
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Vui lòng đăng nhập !!!',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/guest/login'])
      return
    }
    else{
      this.StudyingService.getAllStudying(JSON.parse(localStorage.getItem("mssv") || "")).then((res:any)=>{
        var check = true
        this.cart.forEach((element:any)=>{
          for(let i = 0;i<res.length;i++){
            if(res[i].makhoahoc == element.makhoahoc){
              check = false
              break
            }
            if(res.length==0){
              let obj_tmp = new Studying()
              obj_tmp.massv = JSON.parse(localStorage.getItem("mssv") || "")
              obj_tmp.makhoahoc = element.makhoahoc
              obj_tmp.img = element.image
              obj_tmp.name = element.name
              this.StudyingService.setStudying(obj_tmp).then((res:any)=>{
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Đã thêm ' +  element.name + " !!!",
                  showConfirmButton: false,
                  timer: 1500
                })
                this.getData()
                check=true
              })
            }
          }
          if(check){
            let obj_tmp = new Studying()
            obj_tmp.massv = JSON.parse(localStorage.getItem("mssv") || "")
            obj_tmp.makhoahoc = element.makhoahoc
            obj_tmp.img = element.image
            obj_tmp.name = element.name
            this.StudyingService.setStudying(obj_tmp).then((res:any)=>{
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Đã thêm ' +  element.name + " !!!",
                showConfirmButton: false,
                timer: 1500
              })
              this.getData()
              check=true
            })
          }
          else{
           Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Không thể thêm ' +  element.name + " !!!",
                showConfirmButton: false,
                timer: 1500
              })
            check=true
          }
        })
        localStorage.removeItem("cart-store")
        this.getData()
        
      })
    }
  }
}
