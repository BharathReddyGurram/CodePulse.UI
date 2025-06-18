import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../Model/add-category-request';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../Model/category';
import { environment } from 'src/environments/environment';
import { UpdateCategoryRequest } from '../Model/update-category-request';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http : HttpClient
  ) { }

  AddCategory(model : AddCategoryRequest) : Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/categories`, model)

  }

  GetAllCategories() : Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Categories`);
  }

  GetByIdCategory(id : string | null) : Observable<Category> {
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`);
  }

  UpdateCategory(id: string, updatcategoryrequest : UpdateCategoryRequest): Observable<Category> {
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`, updatcategoryrequest);
  }

  DeleteCategory(id : string): Observable<Category>{
    return this.http.delete<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`);
  }



}
