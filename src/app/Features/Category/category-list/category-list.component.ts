import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../Services/category.service';
import { Category } from '../Model/category';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{
  
  categories$ ?: Observable<Category[]>;
  private deletecategorysubscription ?: Subscription;

  constructor(
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.categories$ = this.categoryService.GetAllCategories();
 }

 DeleteCategory(id: string)
 {
    this.deletecategorysubscription = this.categoryService.DeleteCategory(id).subscribe({
      next: (response) => {
        console.log('Category deleted successfully', response);
        // Refresh the category list after deletion
        this.categories$ = this.categoryService.GetAllCategories();
      }
    })
 }
  

}
