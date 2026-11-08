import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FashionDetailComponent } from './fashion-detail-component';
import { FashionAPIService } from '../services/fashion-apiservice';
import { Fashion } from '../classes/Fashion';

describe('FashionDetailComponent', () => {
  let component: FashionDetailComponent;
  let fixture: ComponentFixture<FashionDetailComponent>;

  const mockFashion: Fashion = {
    _id: '640b187e71d9faa9039ff97d',
    style: 'STREET STYLE',
    fashion_subject: 'Phil Oh’s Best Street Style',
    fashion_detail: 'Description',
    fashion_image: '',
    IdF: 1,
    slug: 'phil-ohs-best-street-style-f1',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FashionDetailComponent],
      providers: [
        {
          provide: FashionAPIService,
          useValue: {
            getFashionByIdOrSlug: () => of(mockFashion),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['slug', 'phil-ohs-best-street-style-f1']])),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FashionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and resolve fashion item', () => {
    expect(component).toBeTruthy();
    expect(component.fashion()?.IdF).toBe(1);
    expect(component.fashion()?.slug).toBe('phil-ohs-best-street-style-f1');
  });
});
