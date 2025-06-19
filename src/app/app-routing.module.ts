import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './Features/Category/category-list/category-list.component';
import { AddCategoryComponent } from './Features/Category/add-category/add-category.component';
import { EditCategoryComponent } from './Features/Category/edit-category/edit-category.component';
import { BlogpostListComponent } from './Features/Blog-Post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './Features/Blog-Post/add-blogpost/add-blogpost.component';

const routes: Routes = [
  {path: 'admin/categories', component: CategoryListComponent},
  {path: 'admin/categories/add', component: AddCategoryComponent},
  {path: 'admin/categories/edit/:id', component: EditCategoryComponent},
  {path: 'admin/blogposts', component: BlogpostListComponent},
  {path: 'admin/blogposts/add', component: AddBlogpostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
