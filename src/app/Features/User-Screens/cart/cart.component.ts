import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
interface CartItem {
  id: number;
  name: string;
  brand?: string;
  color?: string;
  size?: string;
  sku?: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  thumbnailImageUrl?: string | null;
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 items: CartItem[] = [];
  fallbackImage = 'assets/placeholders/product.svg';

  subtotal = 0;
  taxEstimate = 0;
  total = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // TODO: replace with cart service / API later
    this.items = [
      {
        id: 1,
        name: "Men's Chronograph Leather Watch",
        brand: 'Fossil Style',
        color: 'Brown / Smoke Steel',
        size: '42 mm case',
        sku: 'MW-CHRONO-001',
        price: 199.99,
        oldPrice: 229.99,
        quantity: 1,
        thumbnailImageUrl: ''
      },
      {
        id: 2,
        name: 'Wireless Over-Ear Headphones',
        brand: 'SonicBeat',
        color: 'Matte Black',
        size: 'Standard',
        sku: 'WH-1001',
        price: 129.99,
        quantity: 2,
        thumbnailImageUrl: ''
      }
    ];

    this.recalculateTotals();
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.fallbackImage;
  }

  increment(item: CartItem): void {
    item.quantity++;
    this.recalculateTotals();
  }

  decrement(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.recalculateTotals();
    }
  }

  remove(item: CartItem): void {
    this.items = this.items.filter(x => x.id !== item.id);
    this.recalculateTotals();
  }

  saveForLater(item: CartItem): void {
    // you can implement a saved-list later
    this.remove(item);
  }

  recalculateTotals(): void {
    this.subtotal = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    this.taxEstimate = this.subtotal * 0.13; // Ontario HST example
    this.total = this.subtotal + this.taxEstimate;
  }

  goToStore(): void {
    this.router.navigate(['/store']);
  }

  checkout(): void {
    // navigate to your checkout route
    this.router.navigate(['/checkout']);
  }
}
