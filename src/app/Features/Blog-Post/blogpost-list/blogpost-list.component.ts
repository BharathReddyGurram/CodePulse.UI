import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../Services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../Model/BlogPost';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit{
  blogPosts$ ?: Observable<BlogPost[]>

  constructor(
    private blogpostservice: BlogPostService
  ) { }


  ngOnInit(): void {
    this.blogPosts$ = this.blogpostservice.GetAllBlogPosts();
  }

}
