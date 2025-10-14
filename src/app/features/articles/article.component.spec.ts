import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlesComponent } from './articles.component';
import { ArticleService } from '../../shared/service/article.service';
import { PanierService } from '../../shared/service/panier.service';
import { Article } from '../../models/article';
import { of } from 'rxjs';
import { signal } from '@angular/core';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let mockArticleService: Partial<ArticleService>;
  let mockPanierService: Partial<PanierService>;

  const mockArticles: Article[] = [
    {
      id: 1,
      productName: 'Stylo',
      price: 2.5,
      quantity: 10,
      category: 'papeterie',
      isImported: false,
      pTTC: 0,
      tax: 0,
    },
    {
      id: 2,
      productName: 'Livre',
      price: 15,
      quantity: 5,
      category: 'livre',
      isImported: true,
      pTTC: 0,
      tax: 0,
    },
  ];

  beforeEach(async () => {
    mockArticleService = {
      articles: signal(mockArticles),
      isLoading: signal(false),
    };

    mockPanierService = {
      totalCount: signal(3),
      add: jasmine.createSpy('add'),
      items: signal([]),
    };

    await TestBed.configureTestingModule({
      imports: [ArticlesComponent],
      providers: [
        { provide: ArticleService, useValue: mockArticleService },
        { provide: PanierService, useValue: mockPanierService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create composant', () => {
    expect(component).toBeTruthy();
  });

  it('should load articles from service', () => {
    expect(component.articles().length).toBe(2);
    expect(component.categories()).toEqual(['papeterie', 'livre']);
  });

  it('should filtre articles by category', () => {
    component.selectedCategory.set('livre');
    expect(component.filteredArticles().length).toBe(1);
    expect(component.filteredArticles()[0].productName).toBe('Livre');
  });

  it('should add an article into panier', () => {
    const article = mockArticles[0];
    component.onAjout(article);
    expect(mockPanierService.add).toHaveBeenCalledWith(article);
  });
});
