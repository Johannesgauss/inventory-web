import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductCategory } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Output() edit = new EventEmitter<Product>();
  @Output() add = new EventEmitter<void>();

  products: Product[] = [];
  searchQuery = '';
  selectedCategory = 'ALL';
  loading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  categories: string[] = ['ALL', 'HARDWARE', 'PERIFERICOS', 'ESCRITORIO', 'REDES', 'SUPRIMENTOS'];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = null;

    this.productService.getAll(this.searchQuery, this.selectedCategory).subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to connect to the Inventory API. Is the Spring Boot backend running on port 8080?';
      }
    });
  }

  onSearch(): void {
    this.loadProducts();
  }

  onCategoryChange(): void {
    this.loadProducts();
  }

  onClearSearch(): void {
    this.searchQuery = '';
    this.selectedCategory = 'ALL';
    this.loadProducts();
  }

  onAdjustStock(product: Product, delta: number): void {
    if (!product.id) return;
    this.productService.adjustStock(product.id, delta).subscribe({
      next: (updated) => {
        product.quantityInStock = updated.quantityInStock;
        product.status = updated.status;
      },
      error: (err) => {
        alert(err.error?.message || 'Error updating stock.');
      }
    });
  }

  onDelete(product: Product): void {
    if (!product.id) return;
    if (!confirm(`Are you sure you want to delete "${product.name}" (SKU: ${product.sku})?`)) return;

    this.productService.delete(product.id).subscribe({
      next: () => {
        this.successMessage = `Product "${product.name}" removed successfully.`;
        setTimeout(() => (this.successMessage = null), 4000);
        this.loadProducts();
      },
      error: () => {
        this.errorMessage = `Failed to remove product.`;
      }
    });
  }

  get totalInventoryValue(): number {
    return this.products.reduce((acc, p) => acc + (p.price * p.quantityInStock), 0);
  }

  get lowStockCount(): number {
    return this.products.filter(p => p.status === 'LOW_STOCK' || p.status === 'OUT_OF_STOCK').length;
  }
}
