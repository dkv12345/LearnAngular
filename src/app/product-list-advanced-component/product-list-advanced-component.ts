import { Component, signal } from '@angular/core';
import { Product } from '../classes/IProduct';
import { ProductHttpHandleErrorService } from '../services/product-http-handle-error-service';
import { ActivatedRoute, Router } from '@angular/router';
import { createSlug } from '../classes/SlugHelper';


@Component({
  selector: 'app-product-list-advanced-component',
  standalone: false,
  templateUrl: './product-list-advanced-component.html',
  styleUrl: './product-list-advanced-component.css',
})
export class ProductListAdvancedComponent {
  products = signal<Product[]>([]);
  errMessage = signal("");
  public generateSlug = createSlug

  constructor(
    private _service: ProductHttpHandleErrorService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._service.getProductList().subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (err) => {
        this.errMessage.set(err);
      },
    });
  }

  viewDetail(id: number) {
    this.router.navigate(["/products", id]);
  }
  viewDetailSlug(p:Product)
  {
    let slug = this.generateSlug(p.name, p.id)
    this.router.navigate(["/products", slug])
  }
}
