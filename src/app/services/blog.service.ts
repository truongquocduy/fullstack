import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../model/blog.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends BaseService{
  constructor(httpClient: HttpClient){
    super(httpClient);
  }
  getBlogs(){
    return this.get('/blogs')
  }
  getBlogID(id:number){
    return this.get('/blogs/' + id);
  }
  deleteBlog(id:number){
    return this.delete('/blogs/' + id);

  }
  createBlog(blog:Blog){
    return this.post('/blogs',blog)
  }
}
