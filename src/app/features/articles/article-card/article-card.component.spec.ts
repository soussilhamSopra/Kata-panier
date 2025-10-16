import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleCardComponent } from './article-card.component';
import { PanierService } from '../../../core/services/panier.service';
import { Article } from '../../../core/models/article';
import { signal } from '@angular/core';
import { TaxCalculatorService } from '../../../core/services/tax-calculator.service';

describe('ArticleCardComponent', () => {
  let component: ArticleCardComponent;
  let fixture: ComponentFixture<ArticleCardComponent>;

  const mockArticle: Article = {
    id: 1,
    productName: 'Stylo',
    price: 4.37,
    quantity: 10,
    category: 'papeterie',
    isImported: false,
    pTTC: 0,
    tax: 0,
  };

  const mockItemsSignal = signal([
    {
      id: 1,
      productName: 'Stylo',
      price: 4.37,
      quantity: 2,
      category: 'papeterie',
      isImported: false,
      pTTC: 5.0,
      tax: 0.63,
    },
  ]);

  const mockPanierService = {
    add: jasmine.createSpy('add'),
    items: () => mockItemsSignal(),
    totalCount: signal(0),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCardComponent],
      providers: [{ provide: PanierService, useValue: mockPanierService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleCardComponent);
    component = fixture.componentInstance;
    component.article = mockArticle;
    fixture.detectChanges();
  });
  it('should create composant with no erreur', () => {
    expect(component).toBeTruthy();
  });

  it('should call panierService.add() if quantity is valide', () => {
    spyOn(TaxCalculatorService, 'calculerPrixTTC').and.returnValue(5.0);
    spyOn(TaxCalculatorService, 'calculateTaxe').and.returnValue(0.63);

    component.quantite.set(2);
    component.ajouter();

    expect(mockPanierService.add).toHaveBeenCalledWith(
      jasmine.objectContaining({
        id: 1,
        quantity: 2,
        pTTC: 5.0,
        tax: 0.63,
      })
    );
  });

  it('should return "stock-dispo" if stock is disponible', () => {
    component.article.quantity = 10; // stock > panier
    expect(component.getStockClass()).toBe('stock-dispo');
  });

  it('should return "stock-epuise" if stock is épuisé', () => {
    component.article.quantity = 2; // stock dispo = 2

    // Simuler 2 articles déjà dans le panier → stock restant = 0
    mockItemsSignal.set([
      {
        id: 1,
        productName: 'Stylo',
        price: 4.37,
        quantity: 2,
        category: 'papeterie',
        isImported: false,
        pTTC: 5.0,
        tax: 0.63,
      },
    ]);

    fixture.detectChanges(); // s'assurer que le changement est pris en compte

    expect(component.getStockClass()).toBe('stock-epuise');
  });
});
