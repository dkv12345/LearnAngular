import { Component } from '@angular/core';
import { Product } from '../classes/IProduct';

@Component({
  selector: 'app-product-dropdown-list-component',
  standalone: false,
  templateUrl: './product-dropdown-list-component.html',
  styleUrl: './product-dropdown-list-component.css',
})
export class ProductDropdownListComponent {
  // Array of Product objects
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Smartphone', price: 699 },
    { id: 3, name: 'Tablet', price: 399 }
  ];
}
