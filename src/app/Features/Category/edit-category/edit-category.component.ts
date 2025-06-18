import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../Model/category';
import { CategoryService } from '../Services/category.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UpdateCategoryRequest } from '../Model/update-category-request';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  
   id : string | null = null;
   model : Category;
   private paramapsSubscription ?: Subscription;
   private categorySubscription ?: Subscription;
   private updateCategorySubscription ?: Subscription;

  constructor(
    private categoryService : CategoryService,
    private route : ActivatedRoute,
    private router : Router
  ) {
    this.model = {
      id: '',
      name: '',
      urlHandle: ''
    };
  }
 
  ngOnInit(): void {
    this.paramapsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        this.getbyIdcategory(this.id);
      }
    })
  }

  getbyIdcategory(id : string | null)
  {
    this.categorySubscription = this.categoryService.GetByIdCategory(id).subscribe({
      next: (response) =>{
        this.model =response;
      }
    })
  }

  onsubmit(): void
  {
    const updatecategoryrequest : UpdateCategoryRequest = {
      name: this.model.name ?? '',
      urlHandle: this.model.urlHandle ?? ''
    }
    if(this.id)
    {
    this.updateCategorySubscription = this.categoryService.UpdateCategory(this.id, updatecategoryrequest).subscribe({
      next: (response) =>{
        console.log('Category updated successfully', response);
        this.router.navigateByUrl('/admin/categories')
      }

    })


  }
}



   ngOnDestroy(): void {
     this.paramapsSubscription?.unsubscribe();
     this.categorySubscription?.unsubscribe();
     this.updateCategorySubscription?.unsubscribe();
     // Unsubscribe from all subscriptions to prevent memory leaks
  }


}
