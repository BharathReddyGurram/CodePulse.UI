import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

export interface Category {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  productCount: number;
};

export interface CreateCategoryRequest {
  Name: string;
  description?: string;
  IsActive: boolean;
};

export interface UpdateCategoryRequest {
  name: string;
  description?: string;
  isActive: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http : HttpClient
  ) { }

   getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Categories`);
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`);
  }

  create(payload: CreateCategoryRequest): Observable<Category> {
    return this.http.post<Category>(`${environment.apiBaseUrl}/api/Categories`, payload);
  }

  update(id: number, payload: UpdateCategoryRequest): Observable<Category> {
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/api/Categories/${id}`);
  }

}
