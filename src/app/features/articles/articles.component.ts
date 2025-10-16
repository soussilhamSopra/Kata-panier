import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleService } from '../../core/services/article.service';
import { PanierService } from '../../core/services/panier.service';
import { Article } from '../../core/models/article';
import { ArticleCardComponent } from './article-card/article-card.component';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, FormsModule, ArticleCardComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesComponent {
  selectedCategory = signal('all');

  private articleService = inject(ArticleService);
  private panierService = inject(PanierService);

  articles: Signal<Article[]> = this.articleService.articles;
  loading: Signal<boolean> = this.articleService.isLoading;

  categories: Signal<string[]> = computed(() => [
    ...new Set(this.articles().map((a) => a.category)),
  ]);

  filteredArticles: Signal<Article[]> = computed(() => {
    const cat = this.selectedCategory();
    return cat === 'all' ? this.articles() : this.articles().filter((a) => a.category === cat);
  });

  totalArticles: Signal<number> = this.panierService.totalCount;

  onAjout(item: Article) {
    this.panierService.add(item);
  }
}
