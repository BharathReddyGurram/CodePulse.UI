import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './Features/Category/category-list/category-list.component';
import { BlogpostListComponent } from './Features/Blog-Post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './Features/Blog-Post/add-blogpost/add-blogpost.component';
import { LoginComponent } from './Features/Auth/login/login.component';
import { SignupComponent } from './Features/Auth/signup/signup.component';
import { HomeComponent } from './Features/User-Screens/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'admin/categories', component: CategoryListComponent},
  {path: 'admin/blogposts', component: BlogpostListComponent},
  {path: 'admin/blogposts/add', component: AddBlogpostComponent},
  {path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  {
  path: 'admin',
  loadChildren: () =>
    import('./admin/admin.module').then(m => m.AdminModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
