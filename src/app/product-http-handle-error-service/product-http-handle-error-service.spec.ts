import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductHttpHandleErrorService } from './product-http-handle-error-service';

describe('ProductHttpHandleErrorService', () => {
  let component: ProductHttpHandleErrorService;
  let fixture: ComponentFixture<ProductHttpHandleErrorService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductHttpHandleErrorService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductHttpHandleErrorService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
