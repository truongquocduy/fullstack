import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Blog } from 'src/app/model/blog.model';
import { BlogService } from 'src/app/services/blog.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.scss']
})
export class NewpostComponent implements OnInit {
  public Editor = ClassicEditor;
  content:string = ""
  title:string = ""
  author:string = ""
  
  constructor(private BlogService:BlogService) { }

  ngOnInit(): void {

  }
  newBlog(){
    const obj_blognew = new Blog();
    this.BlogService.getBlogs().then((res:any)=>{
      obj_blognew.id = res[res.length-1].id*1 + 1
      obj_blognew.tieude = this.title
      obj_blognew.noidung = this.content
      obj_blognew.hinhanh = 'blog1.jpg'
      let now = new Date().getFullYear() + "-" + <number>new Date().getMonth()+1 + "-" + new Date().getDay();
      obj_blognew.ngaydang = now 
      this.BlogService.createBlog(obj_blognew);
      Swal.fire({
        position: 'top-end',
        iconHtml:'<img src="assets/img/logo.jfif" style="width:100px">',
        title: 'Đã thêm thành công một bài viết mới!!!',
        showConfirmButton: false,
        timer: 1500
      })
      this.content = ""
      this.title = ""
      this.author = ""

    });
    // console.log(obj_blognew.mabl)
  }
}
