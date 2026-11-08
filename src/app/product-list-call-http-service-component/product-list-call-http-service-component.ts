import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../classes/IProduct';
import { ProductHttpService } from '../services/product-http-service';

@Component({
  selector: 'app-product-list-call-http-service-component',
  standalone: false,
  templateUrl: './product-list-call-http-service-component.html',
  styleUrl: './product-list-call-http-service-component.css',
})
export class ProductListCallHttpServiceComponent implements OnInit {
  products = signal<Product[]>([]);

  constructor(private _service: ProductHttpService) {}

  ngOnInit(): void {
    this._service.getProductList().subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (err) => {
        alert('lỗi' + JSON.stringify(err));
      }
    });
  }
}