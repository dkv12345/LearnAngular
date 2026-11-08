import { Component, OnInit, signal } from '@angular/core';
import { FakeProductService } from '../fake-product-service';
import { IFakeProduct } from '../classes/IFakeProduct';

@Component({
  selector: 'app-fake-product-component',
  standalone: false,
  templateUrl: './fake-product-component-27.html',
  styleUrl: './fake-product-component-27.css',
})
export class FakeProductComponent27 implements OnInit {
  products = signal<IFakeProduct[]>([]);
  errMessage = signal('');

  constructor(private _service: FakeProductService) {}

  ngOnInit(): void {
    this._service.getFakeProductData().subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (err: Error) => {
        this.errMessage.set(err.message);
      }
    });
  }
}