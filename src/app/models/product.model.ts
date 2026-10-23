export type ProductCategory = 'HARDWARE' | 'PERIFERICOS' | 'ESCRITORIO' | 'REDES' | 'SUPRIMENTOS';
export type ProductStatus = 'ACTIVE' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'DISCONTINUED';

export interface Product {
  id?: number;
  sku: string;
  name: string;
  description?: string;
  price: number;
  quantityInStock: number;
  minStock: number;
  category: ProductCategory;
  status: ProductStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductRequest {
  sku: string;
  name: string;
  description?: string;
  price: number;
  quantityInStock: number;
  minStock: number;
  category: ProductCategory;
  status?: ProductStatus;
}
