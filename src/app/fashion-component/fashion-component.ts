import { Component, OnInit, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Fashion } from '../classes/Fashion';
import { FashionAPIService } from '../services/fashion-apiservice';
import { createFashionSlug } from '../classes/SlugHelper';

@Component({
  selector: 'app-fashion-component',
  standalone: false,
  templateUrl: './fashion-component.html',
  styleUrl: './fashion-component.css',
})
export class FashionComponent implements OnInit {
  fashions = signal<Fashion[]>([]);
  isLoading = signal<boolean>(true);
  errMessage = signal<string>('');
  searchQuery = signal<string>('');
  selectedStyle = signal<string>('ALL');

  // Helper exposed to template
  public generateSlug = createFashionSlug;

  constructor(
    private _service: FashionAPIService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFashions();
  }

  loadFashions(): void {
    this.isLoading.set(true);
    this.errMessage.set('');
    this._service.getFashions().subscribe({
      next: (data: Fashion[]) => {
        // Ensure every item has its slug populated
        const enriched = data.map((item, idx) => {
          const idF = item.IdF || (idx + 1);
          const slug = item.slug || this.generateSlug(item.fashion_subject, idF);
          return {
            ...item,
            IdF: idF,
            slug: slug,
          };
        });
        this.fashions.set(enriched);
        this.isLoading.set(false);
      },
      error: (err: Error) => {
        this.errMessage.set(err.message || 'Unable to load fashion items.');
        this.isLoading.set(false);
      },
    });
  }

  // Available unique styles for filtering
  styles = computed(() => {
    const list = this.fashions();
    const set = new Set<string>();
    list.forEach((f) => {
      if (f.style) set.add(f.style.trim());
    });
    return Array.from(set);
  });

  // Filtered list based on search and style
  filteredFashions = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const style = this.selectedStyle();
    return this.fashions().filter((item) => {
      const matchQuery =
        !query ||
        item.fashion_subject.toLowerCase().includes(query) ||
        item.fashion_detail.toLowerCase().includes(query) ||
        String(item.IdF).includes(query) ||
        item.slug.toLowerCase().includes(query);

      const matchStyle = style === 'ALL' || item.style.toUpperCase() === style.toUpperCase();
      return matchQuery && matchStyle;
    });
  });

  // Navigation handlers
  viewDetailBySlug(fashion: Fashion): void {
    const slug = fashion.slug || this.generateSlug(fashion.fashion_subject, fashion.IdF);
    this.router.navigate(['/fashion-detail', slug]);
  }

  viewDetailByIdF(idF: number): void {
    this.router.navigate(['/fashion-detail', idF]);
  }

  onFilterStyle(style: string): void {
    this.selectedStyle.set(style);
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }
}
