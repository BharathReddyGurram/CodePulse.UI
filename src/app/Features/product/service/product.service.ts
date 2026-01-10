import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface ProductCategory {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  productCount: number;
}

export interface CreateProductRequest {
  name: string;
  shortDescription?: string | null;
  description?: string | null;
  sku?: string | null;
  barcode?: string | null;
  brand?: string | null;

  price: number;
  oldPrice?: number | null;
  costPrice?: number | null;

  stockQuantity: number;
  categoryId?: number | null;     // primary category
  categoryIds: number[];          // multi categories

  tags?: string | null;

  color?: string | null;
  size?: string | null;
  weightKg?: number | null;
  widthCm?: number | null;
  heightCm?: number | null;
  depthCm?: number | null;
}

export interface ProductDto {
  id: number;
  name: string;
  shortDescription?: string | null;
  description?: string | null;
  sku?: string | null;
  barcode?: string | null;
  brand?: string | null;
  price: number;
  oldPrice?: number | null;
  costPrice?: number | null;
  stockQuantity: number;
  isActive: boolean;
  isFeatured: boolean;
  categoryId: number;
  categoryName?: string | null;
  tags?: string | null;
  thumbnailImageUrl?: string | null;
  imageUrl1?: string | null;
  imageUrl2?: string | null;
  imageUrl4?: string | null;
  color?: string | null;
  size?: string | null;
  weightKg?: number | null;
  widthCm?: number | null;
  heightCm?: number | null;
  depthCm?: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}
  private apiBase = 'http://localhost:4200';

  getCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`${environment.apiBaseUrl}/api/categories`);
  }

  createProduct(data: CreateProductRequest, imageFile?: File): Observable<any> {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('shortDescription', data.shortDescription ?? '');
    formData.append('description', data.description ?? '');

    formData.append('sku', data.sku ?? '');
    formData.append('barcode', data.barcode ?? '');
    formData.append('brand', data.brand ?? '');

    formData.append('price', String(data.price));
    formData.append('oldPrice', data.oldPrice != null ? String(data.oldPrice) : '');
    formData.append('costPrice', data.costPrice != null ? String(data.costPrice) : '');

    formData.append('stockQuantity', String(data.stockQuantity));

    if (data.categoryId != null) {
      formData.append('categoryId', String(data.categoryId));
    }

    (data.categoryIds || []).forEach((id) => {
      formData.append('categoryIds', String(id));
    });

    formData.append('tags', data.tags ?? '');

    formData.append('color', data.color ?? '');
    formData.append('size', data.size ?? '');
    formData.append('weightKg', data.weightKg != null ? String(data.weightKg) : '');
    formData.append('widthCm', data.widthCm != null ? String(data.widthCm) : '');
    formData.append('heightCm', data.heightCm != null ? String(data.heightCm) : '');
    formData.append('depthCm', data.depthCm != null ? String(data.depthCm) : '');

    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.post(`${environment.apiBaseUrl}/api/products`, formData);
  }

   getAllProducts(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${environment.apiBaseUrl}/api/products`);
  }
  fixImageUrl(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${environment.apiImageurl}`+ url; // "/images/..." -> "https://localhost:7000/images/..."
}
}
