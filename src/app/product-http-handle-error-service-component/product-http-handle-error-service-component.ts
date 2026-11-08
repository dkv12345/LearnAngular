import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../classes/IProduct';
import { ProductHttpHandleErrorService } from '../services/product-http-handle-error-service';

@Component({
  selector: 'app-product-http-handle-error-service-component',
  standalone: false,
  templateUrl: './product-http-handle-error-service-component.html',
  styleUrl: './product-http-handle-error-service-component.css',
})
export class ProductHttpHandleErrorServiceComponent implements OnInit {
  products = signal<Product[]>([]);
  errMessage = signal("");

  constructor(private _service: ProductHttpHandleErrorService) {}

  ngOnInit(): void {
    this._service.getProductList().subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (err) => {
        this.errMessage.set(err.message || err);
      },
    });
  }
}
