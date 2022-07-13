import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/model/blog.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blogdetail',
  templateUrl: './blogdetail.component.html',
  styleUrls: ['./blogdetail.component.scss']
})
export class BlogdetailComponent implements OnInit {
  blog:Blog = new Blog()
  BlogTarget:any 
  constructor(private route: ActivatedRoute,private BlogService:BlogService,private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.BlogTarget = this.route.snapshot.paramMap.get('id')
    this.getData()
  }
  getData(){
    this.BlogService.getBlogID(this.BlogTarget).then((res:any)=>{
      this.blog = res
    })
  }
}
