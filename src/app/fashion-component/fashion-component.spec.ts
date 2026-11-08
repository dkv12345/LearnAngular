import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FashionComponent } from './fashion-component';
import { FashionAPIService } from '../services/fashion-apiservice';

describe('FashionComponent', () => {
  let component: FashionComponent;
  let fixture: ComponentFixture<FashionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FashionComponent],
      providers: [
        {
          provide: FashionAPIService,
          useValue: { getFashions: () => of([]) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FashionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
