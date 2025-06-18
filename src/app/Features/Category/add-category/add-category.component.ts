import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../Model/add-category-request';
import { CategoryService } from '../Services/category.service';
import { Subscription } from 'rxjs';
import { Route, Router } from '@angular/router';
import { CategoryListComponent } from '../category-list/category-list.component';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy {
  model : AddCategoryRequest
  private addCategorySubscription ?: Subscription 

  constructor(
    private categoryService: CategoryService,
    private router : Router
  ) 
  {
    this.model = {
      name: '',
      urlHandle: ''
    };
  }
  

  onFormSubmit() {
    this.addCategorySubscription = this.categoryService.AddCategory(this.model).subscribe({
      next: (Response) => {
        this.model = {
          name: '',
          urlHandle: ''}
        this.router.navigateByUrl('/admin/categories');
      }
    })
}

ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }

}
