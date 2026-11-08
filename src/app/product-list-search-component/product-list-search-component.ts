import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../classes/IProduct';
import { createSlug } from '../classes/SlugHelper';
import { ProductHttpHandleErrorService } from '../services/product-http-handle-error-service';

@Component({
  selector: 'app-product-list-search-component',
  standalone: false,
  templateUrl: './product-list-search-component.html',
  styleUrl: './product-list-search-component.css',
})
export class ProductListSearchComponent implements OnInit {
  DEFAULT_MIN_PRICE = 0;
  DEFAULT_MAX_PRICE = 100000000;

  // Toàn bộ sản phẩm từ server
  products = signal<Product[]>([]);
  // Check error
  errMessage = signal<string>('');
  // Sản phẩm sau khi đã lọc
  filteredProducts = signal<Product[]>([]);
  // Biến giữ giá trị lọc để hiển thị lên UI
  minPrice = signal<number>(this.DEFAULT_MIN_PRICE);
  maxPrice = signal<number>(this.DEFAULT_MAX_PRICE);

  public generateSlug = createSlug;

  constructor(
    private _service: ProductHttpHandleErrorService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 1. Tải toàn bộ sản phẩm về trước
    this._service.getProductList().subscribe({
      next: (data) => {
        this.products.set(data);
        this.watchQueryParams();
      },
      error: (err) => {
        this.errMessage.set(err);
      }
    });
  }

  private watchQueryParams() {
    this.activateRoute.queryParamMap.subscribe((params) => {
      const min = Number(params.get('min')) || this.DEFAULT_MIN_PRICE;
      const max = Number(params.get('max')) || this.DEFAULT_MAX_PRICE;

      this.minPrice.set(min);
      this.maxPrice.set(max);

      // Thực hiện lọc logic
      const result = this.products().filter(
        (p) => p.price >= min && p.price <= max
      );
      this.filteredProducts.set(result);
    });
  }

  // Hàm gọi khi nhấn nút "Lọc"
  onFilter() {
    this.router.navigate([], {
      relativeTo: this.activateRoute,
      queryParams: {
        min: this.minPrice(),
        max: this.maxPrice(),
      },
      queryParamsHandling: 'merge', // Giữ lại các params khác nếu có
    });
  }

  // Hàm gọi khi nhấn nút "Show All"
  onShowAll() {
    this.minPrice.set(this.DEFAULT_MIN_PRICE);
    this.maxPrice.set(this.DEFAULT_MAX_PRICE);

    // Xóa min và max khỏi queryParams trên URL
    this.router.navigate([], {
      relativeTo: this.activateRoute,
      queryParams: {
        min: null,
        max: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  viewDetail(id: number) {
    this.router.navigate(['/products', id]);
  }

  viewDetailSlug(p: Product) {
    const slug = this.generateSlug(p.name, p.id);
    this.router.navigate(['/products', slug]);
  }
}