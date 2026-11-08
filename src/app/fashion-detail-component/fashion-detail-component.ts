import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fashion } from '../classes/Fashion';
import { FashionAPIService } from '../services/fashion-apiservice';
import { getIdentityType, extractFashionIdFromSlug } from '../classes/SlugHelper';

@Component({
  selector: 'app-fashion-detail-component',
  standalone: false,
  templateUrl: './fashion-detail-component.html',
  styleUrl: './fashion-detail-component.css',
})
export class FashionDetailComponent implements OnInit {
  fashion = signal<Fashion | null>(null);
  isLoading = signal<boolean>(true);
  errMessage = signal<string>('');
  currentSlugOrId = signal<string>('');
  identityType = signal<string>('');
  resolvedIdF = signal<number | null>(null);
  copied = signal<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fashionService: FashionAPIService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slugOrId = params.get('slug') || params.get('id');
      if (slugOrId) {
        this.currentSlugOrId.set(slugOrId);
        this.resolveAndLoadFashion(slugOrId);
      } else {
        this.errMessage.set('No fashion identifier or slug provided in URL.');
        this.isLoading.set(false);
      }
    });
  }

  resolveAndLoadFashion(identifier: string): void {
    this.isLoading.set(true);
    this.errMessage.set('');

    const type = getIdentityType(identifier);
    this.identityType.set(type);
    const extractedId = extractFashionIdFromSlug(identifier);
    this.resolvedIdF.set(extractedId);

    this.fashionService.getFashionByIdOrSlug(identifier).subscribe({
      next: (item) => {
        if (item) {
          this.fashion.set(item);
          if (item.IdF) {
            this.resolvedIdF.set(item.IdF);
          }
        } else {
          this.fashion.set(null);
          this.errMessage.set(`Unable to find fashion article corresponding to "${identifier}".`);
        }
        this.isLoading.set(false);
      },
      error: (err: Error) => {
        this.errMessage.set(err.message || 'Error occurred while resolving fashion details.');
        this.fashion.set(null);
        this.isLoading.set(false);
      },
    });
  }

  copySlug(): void {
    const slug = this.fashion()?.slug || this.currentSlugOrId();
    if (slug && navigator.clipboard) {
      navigator.clipboard.writeText(slug).then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/fashion-list']);
  }
}
