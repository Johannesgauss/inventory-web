import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product, ProductCategory, ProductRequest } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnChanges {
  @Input() productToEdit: Product | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  form: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  categories: ProductCategory[] = ['HARDWARE', 'PERIFERICOS', 'ESCRITORIO', 'REDES', 'SUPRIMENTOS'];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.form = this.fb.group({
      sku: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      description: [''],
      price: [null, [Validators.required, Validators.min(0.01)]],
      quantityInStock: [0, [Validators.required, Validators.min(0)]],
      minStock: [5, [Validators.required, Validators.min(0)]],
      category: ['HARDWARE', [Validators.required]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productToEdit'] && this.productToEdit) {
      this.form.patchValue({
        sku: this.productToEdit.sku,
        name: this.productToEdit.name,
        description: this.productToEdit.description || '',
        price: this.productToEdit.price,
        quantityInStock: this.productToEdit.quantityInStock,
        minStock: this.productToEdit.minStock,
        category: this.productToEdit.category
      });
    } else if (changes['productToEdit'] && !this.productToEdit) {
      this.form.reset({
        quantityInStock: 0,
        minStock: 5,
        category: 'HARDWARE'
      });
    }
  }

  get isEditMode(): boolean {
    return !!this.productToEdit && !!this.productToEdit.id;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    const payload: ProductRequest = this.form.value;

    if (this.isEditMode && this.productToEdit?.id) {
      this.productService.update(this.productToEdit.id, payload).subscribe({
        next: () => {
          this.loading = false;
          this.saved.emit();
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Failed to update product.';
        }
      });
    } else {
      this.productService.create(payload).subscribe({
        next: () => {
          this.loading = false;
          this.saved.emit();
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Failed to create product. Check if SKU is unique.';
        }
      });
    }
  }

  onCancel(): void {
    this.form.reset();
    this.errorMessage = null;
    this.cancelled.emit();
  }
}
