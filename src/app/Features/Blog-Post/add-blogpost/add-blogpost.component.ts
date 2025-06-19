import { Component, OnDestroy } from '@angular/core';
import { AddBlogPost } from '../Model/add-blogpost';
import { Subscription } from 'rxjs';
import { BlogPostService } from '../Services/blog-post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnDestroy {
  model : AddBlogPost;
  private CreateBlogPostSubscription ?: Subscription;
  

  constructor(
    private blogpostservice : BlogPostService,
    private router : Router

  ) {
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      author: '',
      publishedDate: new Date(),
      isVisible: true
    };
  }
  

  OnFormSubmit()
  {
    this.CreateBlogPostSubscription = this.blogpostservice.AddBlogPost(this.model).subscribe({
      next: (response) =>
      {
        console.log('Blog post created successfully:', response);
        this.router.navigateByUrl('/admin/blogposts');
      }
    })
  }

 ngOnDestroy(): void {
    this.CreateBlogPostSubscription?.unsubscribe();
  }




}
