import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FakeProductComponent27 } from './fake-product-component-27';

describe('FakeProductComponent27', () => {
  let component: FakeProductComponent27;
  let fixture: ComponentFixture<FakeProductComponent27>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FakeProductComponent27],
    }).compileComponents();

    fixture = TestBed.createComponent(FakeProductComponent27);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
