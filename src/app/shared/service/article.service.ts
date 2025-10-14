import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Article } from '../../models/article';
import { catchError, first, tap, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private _articles = signal<Article[]>([]);
  private _isLoading = signal(false);
  readonly articles = computed(() => this._articles());
  readonly isLoading = computed(() => this._isLoading());

  constructor(private http: HttpClient) {
    this.fetchArticles();
  }

  private fetchArticles(): void {
    this._isLoading.set(true);
    this.http
      .get<Article[]>('/assets/articles.json')
      .pipe(
        first(),
        catchError((err) => {
          console.error('Erreur lors du chargement', err);
          return of([]);
        }),
        tap((a) => {
          const sanitized = a.map((item) => ({
            ...item,
            productName: item.productName,
          }));
          this._articles.set(sanitized);
          this._isLoading.set(false);
        })
      )
      .subscribe();
  }
}
