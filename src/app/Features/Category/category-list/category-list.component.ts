import { Component, OnInit } from '@angular/core';
import { Category, CategoryService, CreateCategoryRequest, UpdateCategoryRequest } from '../Services/category.service';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface CategoryVm {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  productCount: number;
}
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent{
  categories: Category[] = [];
  categoryForm: FormGroup;
  isPanelOpen = false;
  isEditing = false;
  selectedCategory: Category | null = null;
  search = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
  private categoryService: CategoryService
  ) { 
     this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      isActive: [true]
    });

    this.loadCategories();
  }
  loadCategories() {
    this.isLoading = true;
    this.categoryService.getAll().subscribe({
      next: (cats) => {
        this.categories = cats;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  filteredCategories(): Category[] {
    const term = this.search.toLowerCase();
    if (!term) return this.categories;
    return this.categories.filter(c => c.name.toLowerCase().includes(term));
  }

  startCreate() {
    this.isEditing = false;
    this.selectedCategory = null;
    this.categoryForm.reset({ name: '', description: '', isActive: true });
    this.isPanelOpen = true;
  }

  startEdit(cat: Category) {
    this.isEditing = true;
    this.selectedCategory = cat;
    this.categoryForm.patchValue({
      name: cat.name,
      description: cat.description,
      isActive: cat.isActive
    });
    this.isPanelOpen = true;
  }

  closePanel() {
    this.isPanelOpen = false;
  }

  hasError(controlName: string, errorName: string) {
    const control = this.categoryForm.get(controlName);
    return control?.touched && control?.hasError(errorName);
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const formValue = this.categoryForm.value;

    if (this.isEditing && this.selectedCategory) {
      const payload: UpdateCategoryRequest = {
        name: formValue.name,
        description: formValue.description,
        isActive: formValue.isActive
      };

      this.categoryService.update(this.selectedCategory.id, payload).subscribe({
        next: (updated) => {
          const idx = this.categories.findIndex(c => c.id === updated.id);
          if (idx >= 0) this.categories[idx] = updated;
          this.closePanel();
        }
      });
    } else {
      const payload: CreateCategoryRequest = {
        Name: formValue.name,
        description: formValue.description,
        IsActive: formValue.isActive
      };

      this.categoryService.create(payload).subscribe({
        next: (created) => {
          this.categories = [created, ...this.categories];
          this.closePanel();
        }
      });
    }
  }

  deleteCategory(cat: Category) {
    if (!confirm(`Delete category "${cat.name}"?`)) return;

    this.categoryService.delete(cat.id).subscribe({
      next: () => {
        this.categories = this.categories.filter(c => c.id !== cat.id);
      }
    });
  }

}
