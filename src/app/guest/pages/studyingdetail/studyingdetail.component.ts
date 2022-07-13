import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Cart } from 'src/app/model/cart.model';
import { Course } from 'src/app/model/course.model';
import { CourseService } from 'src/app/services/course.service';
import { addCart } from 'src/app/store.action';

@Component({
  selector: 'app-studyingdetail',
  templateUrl: './studyingdetail.component.html',
  styleUrls: ['./studyingdetail.component.scss']
})
export class StudyingdetailComponent implements OnInit {
  lishcoursedetail:Course = new Course()
  tieuderutgon:any
  khoahoctarget:any = ""
  cart:Cart[] = []
  constructor(private route: ActivatedRoute,private Courses:CourseService,private store: Store<{cart: any }>) { }

  ngOnInit(): void {
    this.khoahoctarget = this.route.snapshot.paramMap.get('id')
    this.getData()
    
  }
  getData(){
    this.Courses.getAllCoursesID(this.khoahoctarget).then((res:any)=>{
      this.lishcoursedetail =  res
    })
    var tieude:any[] = []
    this.Courses.getAllCoursesID(this.khoahoctarget).then((res:any)=>{
      res.baihoc.forEach((element:any)=> {
        tieude.push(element.tieude)
        this.tieuderutgon = new Set(tieude);
        this.store.select('cart').subscribe((data) => this.cart = data )
      });
    })

  }
  addcart(course:Course){
      const cartItem = new Cart()
      cartItem.makhoahoc = course.id
      cartItem.name = course.name
      cartItem.task = course.task
      cartItem.image = course.image
      cartItem.price = course.price
      for(let i =0; i<this.cart.length;i++){
        // alert("duy")
        if(this.cart[i].name == cartItem.name){
          this.store.select('cart').subscribe((data) => this.cart = data )
          return
        }
      }
      this.store.dispatch(addCart({value: cartItem}));
      this.store.select('cart').subscribe((data) => this.cart = data )
  }
 
}
