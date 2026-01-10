import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateProductRequest, ProductCategory, ProductService } from './service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  form!: FormGroup;
  categories: ProductCategory[] = [];
  submitting = false;

  imageFile?: File;
  imagePreview: string | null = null;
  successVisible = false;
  showScrollTop = false;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadCategories();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      shortDescription: [''],
      description: [''],

      sku: [''],
      barcode: [''],
      brand: [''],

      price: [null, [Validators.required, Validators.min(0.01)]],
      oldPrice: [null],
      costPrice: [null],

      stockQuantity: [0, [Validators.min(0)]],

      categoryId: [null],        // primary category (optional)
      categoryIds: [[]],         // additional categories (pills)

      tags: [''],

      color: [''],
      size: [''],
      weightKg: [null],
      widthCm: [null],
      heightCm: [null],
      depthCm: [null]
    });
  }

  private loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (cats) => (this.categories = cats),
      error: (err) => console.error('Failed to load categories', err)
    });
  }

  // Category pill helpers
  isCategorySelected(id: number): boolean {
    const current: number[] = this.form.get('categoryIds')?.value ?? [];
    return current.includes(id);
  }

  toggleCategory(id: number): void {
    const control = this.form.get('categoryIds');
    if (!control) return;

    const current: number[] = control.value ?? [];
    const exists = current.includes(id);
    const updated = exists ? current.filter((c) => c !== id) : [...current, id];
    control.setValue(updated);
    control.markAsDirty();
  }

  // Image
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.imageFile = file;

    const reader = new FileReader();
    reader.onload = () => (this.imagePreview = reader.result as string);
    reader.readAsDataURL(file);
  }

  clearImage(): void {
    this.imageFile = undefined;
    this.imagePreview = null;
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }

  onSubmit(): void {
    console.log('submit clicked', this.form.value);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.value;
    const payload: CreateProductRequest = {
      name: raw.name,
      shortDescription: raw.shortDescription,
      description: raw.description,
      sku: raw.sku,
      barcode: raw.barcode,
      brand: raw.brand,
      price: Number(raw.price),
      oldPrice: raw.oldPrice != null && raw.oldPrice !== '' ? Number(raw.oldPrice) : null,
      costPrice: raw.costPrice != null && raw.costPrice !== '' ? Number(raw.costPrice) : null,
      stockQuantity: Number(raw.stockQuantity ?? 0),
      categoryId: raw.categoryId ? Number(raw.categoryId) : null,
      categoryIds: raw.categoryIds ?? [],
      tags: raw.tags,
      color: raw.color,
      size: raw.size,
      weightKg: raw.weightKg != null && raw.weightKg !== '' ? Number(raw.weightKg) : null,
      widthCm: raw.widthCm != null && raw.widthCm !== '' ? Number(raw.widthCm) : null,
      heightCm: raw.heightCm != null && raw.heightCm !== '' ? Number(raw.heightCm) : null,
      depthCm: raw.depthCm != null && raw.depthCm !== '' ? Number(raw.depthCm) : null
    };

    this.submitting = true;
    this.productService.createProduct(payload, this.imageFile).subscribe({
      next: () => {
        this.submitting = false;
        this.successVisible = true;
        this.showSuccess();
        alert('Product created'); 
        this.router.navigate(['admin/dashboard']);
      },
      error: (err) => {
        console.error('Create product failed', err);
        this.submitting = false;
      }
    });
  }

  private showSuccess(): void {
  this.successVisible = true;
  setTimeout(() => {
    this.successVisible = false;
    this.router.navigate(['admin/dashboard']);
  }, 1800); // show for 1.8s then navigate
}

  triggerImagePicker(): void {
  if (this.fileInput?.nativeElement) {
    this.fileInput.nativeElement.click();
  }
}

// Scroll to top button
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showScrollTop = window.pageYOffset > 200;
  }
scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
