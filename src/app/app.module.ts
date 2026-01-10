import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryListComponent } from './Features/Category/category-list/category-list.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BlogpostListComponent } from './Features/Blog-Post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './Features/Blog-Post/add-blogpost/add-blogpost.component';
import { MarkdownModule } from 'ngx-markdown';
import { LoginComponent } from './Features/Auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './Features/Auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './Core/auth.interceptor';
import { HomeComponent } from './Features/User-Screens/home/home.component';
import { CartComponent } from './Features/User-Screens/cart/cart.component';
import { ProductComponent } from './Features/product/product.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './Features/Navbar/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryListComponent,
    BlogpostListComponent,
    AddBlogpostComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    CartComponent,
    ProductComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
