import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/model/blog.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blogpage',
  templateUrl: './blogpage.component.html',
  styleUrls: ['./blogpage.component.scss']
})
export class BlogpageComponent implements OnInit {
  listBlog:Blog[] = []
  constructor(private BlogService:BlogService) { }

  ngOnInit(): void {
    this.getData()
  }
  getData(){
    this.BlogService.getBlogs().then((res:any)=>{
      this.listBlog = res
    })
  }
}
