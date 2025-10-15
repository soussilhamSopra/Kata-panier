import { TestBed } from '@angular/core/testing';
import { ArticleService } from './article.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Article } from '../../models/article';

describe('ArticleService', () => {
  let service: ArticleService;
  let httpMock: HttpTestingController;

  const mockArticles: Article[] = [
    {
      id: 1,
      productName: 'Stylo',
      price: 1.4,
      quantity: 10,
      category: 'papeterie',
      isImported: false,
      pTTC: 0,
      tax: 0,
    },
    {
      id: 2,
      productName: 'Classeur',
      price: 3.2,
      quantity: 5,
      category: 'papeterie',
      isImported: false,
      pTTC: 0,
      tax: 0,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleService],
    });

    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // vérifie qu'aucune requête n'est en attente
  });

  it('devrait être créé', () => {
    const service = TestBed.inject(ArticleService);
    const req = httpMock.expectOne('/assets/articles.json');
    req.flush([]); // simule une réponse vide
    expect(service).toBeTruthy();
  });

  it('devrait charger les articles depuis le fichier JSON', () => {
    const req = httpMock.expectOne('/assets/articles.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockArticles); // simule la réponse HTTP

    const articles = service.articles();
    expect(articles.length).toBe(2);
    expect(articles[0].productName).toBe('Stylo');
    expect(service.isLoading()).toBeFalse();
  });

  it('devrait gérer une erreur de chargement et retourner un tableau vide', () => {
    const req = httpMock.expectOne('/assets/articles.json');
    req.error(new ErrorEvent('Network error'));

    const articles = service.articles();
    expect(articles).toEqual([]);
    expect(service.isLoading()).toBeFalse();
  });
});
