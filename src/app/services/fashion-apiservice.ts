import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError, of, switchMap } from 'rxjs';
import { Fashion } from '../classes/Fashion';
import { createFashionSlug, extractFashionIdFromSlug, sanitizeSlug } from '../classes/SlugHelper';

@Injectable({
  providedIn: 'root',
})
export class FashionAPIService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
  private requestOptions: Object = {
    headers: this.headers,
    responseType: 'text',
  };

  constructor(private _http: HttpClient) {}

  /**
   * Helper to ensure each Fashion item has a valid unique numeric IdF and slug.
   */
  private processFashionItem(item: any, index: number): Fashion {
    const idF = (typeof item.IdF === 'number' && item.IdF > 0) ? item.IdF : (index + 1);
    const slug = item.slug && item.slug.trim() !== ''
      ? item.slug
      : createFashionSlug(item.fashion_subject || `fashion-${idF}`, idF);

    return {
      _id: item._id ?? null,
      style: item.style || 'Fashion',
      fashion_subject: item.fashion_subject || '',
      fashion_detail: item.fashion_detail || '',
      fashion_image: item.fashion_image || '',
      IdF: idF,
      slug: slug,
    };
  }

  /**
   * Get all fashion items.
   */
  getFashions(): Observable<Fashion[]> {
    return this._http.get<any>('/fashions', this.requestOptions).pipe(
      map((res) => {
        const raw = typeof res === 'string' ? JSON.parse(res) : res;
        const list = Array.isArray(raw) ? raw : [];
        return list.map((item, idx) => this.processFashionItem(item, idx));
      }),
      retry(2),
      catchError(this.handleError)
    );
  }

  /**
   * Get a specific fashion item by its unique numeric IdF, ObjectId, or Slug.
   */
  getFashionByIdOrSlug(identifier: string | number): Observable<Fashion | null> {
    const identStr = String(identifier).trim();

    return this._http.get<any>(`/fashions/${encodeURIComponent(identStr)}`, this.requestOptions).pipe(
      map((res) => {
        const data = typeof res === 'string' ? JSON.parse(res) : res;
        if (!data || data.error) return null;
        return this.processFashionItem(data, 0);
      }),
      catchError(() => {
        // Fallback: fetch all and resolve locally in case backend endpoint differs
        return this.getFashions().pipe(
          map((list) => {
            const extractedId = extractFashionIdFromSlug(identStr);
            const numVal = !isNaN(Number(identStr)) ? Number(identStr) : null;
            const targetId = extractedId ?? numVal;
            const targetSlugSanitized = sanitizeSlug(identStr);

            return list.find((f) => {
              if (targetId !== null && f.IdF === targetId) return true;
              if (f.slug === identStr) return true;
              if (sanitizeSlug(f.slug) === targetSlugSanitized) return true;
              if (sanitizeSlug(f.fashion_subject) === targetSlugSanitized) return true;
              if (f._id && String(f._id) === identStr) return true;
              return false;
            }) ?? null;
          })
        );
      })
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message || 'Server error occurred'));
  }
}
