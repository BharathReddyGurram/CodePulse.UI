import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategory, ProductDto, ProductService } from '../../product/service/product.service';
interface Product {
  id: number;
  name: string;
  shortDescription?: string | null;
  price: number;
  oldPrice?: number | null;
  thumbnailImageUrl?: string | null;
  categoryId: number;
  categoryName?: string | null;
}

interface CategoryGroup {
  categoryId: number;
  categoryName: string;
  products: ProductDto[];
  page: number;
  pageSize: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  grouped: CategoryGroup[] = [];
 loading = false;
 categories: ProductCategory[] = [];
  error: string | null = null;

  heroDeals = [
    'Up to 40% off premium audio',
    'Buy 2 get 1 free on selected beauty',
    'Free shipping on orders over $75',
    'Limited time: extra 15% off home essentials'
  ];
  activeDealIndex = 0;

  showScrollTop = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.startDealRotation();
    this.loadProducts();
  }

   private loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (products: ProductDto[]) => {
        this.loading = false;
        this.grouped = this.groupByCategory(products);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to load products';
        console.error(err);
      }
    });
  }

   private groupByCategory(products: ProductDto[]): CategoryGroup[] {
    const map = new Map<number, CategoryGroup>();

    products.forEach((p) => {
      const id = p.categoryId;
      const name = p.categoryName || 'Other';
      if (!map.has(id)) {
        map.set(id, {
          categoryId: id,
          categoryName: name,
          products: [],
          page: 1,
          pageSize: 8
        });
      }
      map.get(id)!.products.push(p);
    });

    return Array.from(map.values());
  }

  getProductsForCategory(group: CategoryGroup): ProductDto[] {
    const start = (group.page - 1) * group.pageSize;
    return group.products.slice(start, start + group.pageSize);
  }

  nextPage(group: CategoryGroup): void {
    const maxPage = Math.ceil(group.products.length / group.pageSize);
    if (group.page < maxPage) {
      group.page++;
    }
  }

  prevPage(group: CategoryGroup): void {
    if (group.page > 1) {
      group.page--;
    }
  }

  // Deals banner rotation
  private startDealRotation(): void {
    setInterval(() => {
      this.activeDealIndex =
        (this.activeDealIndex + 1) % this.heroDeals.length;
    }, 4000);
  }

  // Scroll to top button
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showScrollTop = window.pageYOffset > 200;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  trackByCategoryId(_: number, group: CategoryGroup): number {
    return group.categoryId;
  }

  trackByProductId(_: number, product: Product): number {
    return product.id;
  }

  getTotalPages(group: CategoryGroup): number {
  return Math.ceil(group.products.length / group.pageSize);
}
getImageUrl(p: ProductDto): string {
  const url = this.productService.fixImageUrl(
    p.thumbnailImageUrl || p.imageUrl1 || ''
  );
  return url || 'assets/placeholders/product.svg';
}
onImageError(event: Event): void {
  const img = event.target as HTMLImageElement;
  img.src = 'assets/placeholders/product.svg';
}
 private loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (cats) => (this.categories = cats),
      error: (err) => console.error('Failed to load categories', err)
    });
  }


}
