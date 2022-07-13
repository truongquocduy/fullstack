import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/model/blog.model';
import { BlogService } from 'src/app/services/blog.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  listBlog:Blog [] = []
  htmlString:string = "<h1>HELLO</h1>"
  constructor(private BlogService:BlogService) { }

  ngOnInit(): void {
    this.loadData()
  }
  loadData(){
    this.BlogService.getBlogs().then((res:any)=>{
      this.listBlog = res
    })
  }
  deletePost(id:any){
    Swal.fire({
      title: 'Admin bạn muốn xóa bài viết này sao!!!',
      showDenyButton: true,
      iconHtml:'<img src="assets/img/logo.jfif" style="width:100px">',
      showCancelButton: false,
      confirmButtonText: 'Tôi chắc chắn!!!',
      denyButtonText: `Không`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.BlogService.deleteBlog(id).then(()=>{
          this.loadData()
        });
      }
    })
  }
}
