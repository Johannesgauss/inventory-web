import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductListComponent, ProductFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ProductListComponent) listComponent?: ProductListComponent;

  showForm = false;
  selectedProduct: Product | null = null;

  openNewForm(): void {
    this.selectedProduct = null;
    this.showForm = true;
  }

  openEditForm(product: Product): void {
    this.selectedProduct = { ...product };
    this.showForm = true;
  }

  onSaved(): void {
    this.showForm = false;
    this.selectedProduct = null;
    this.listComponent?.loadProducts();
  }

  onCancelled(): void {
    this.showForm = false;
    this.selectedProduct = null;
  }
}
