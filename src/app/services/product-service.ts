import { Injectable } from '@angular/core';
import { Product } from '../classes/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Smartphone', price: 699 },
    { id: 3, name: 'Tablet', price: 399 }
  ];

  constructor() {}

  getProductList() {
    return this.products;
  }

  filterProductListByPrice(min: number, max: number) {
    return this.products.filter(p => p.price >= min && p.price <= max);
  }
}
