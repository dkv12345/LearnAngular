import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/IProduct';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'app-product-list-call-service-component',
  standalone: false,
  templateUrl: './product-list-call-service-component.html',
  styleUrl: './product-list-call-service-component.css',
})
export class ProductListCallServiceComponent implements OnInit {
  products: Product[] = [];

  constructor(private ps: ProductService) {}

  ngOnInit(): void {
    this.products = this.ps.getProductList();
  }
}
