import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanierComponent } from './panier.component';
import { PanierService } from '../../shared/service/panier.service';
import { signal } from '@angular/core';
import { Article } from '../../models/article';

describe('PanierComponent', () => {
  let component: PanierComponent;
  let fixture: ComponentFixture<PanierComponent>;

  const mockArticles: Article[] = [
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
    {
      id: 2,
      productName: 'Livre',
      price: 15,
      quantity: 1,
      category: 'livre',
      isImported: true,
      pTTC: 18,
      tax: 3,
    },
  ];

  // Mock du PanierService
  const mockPanierService = {
    items: signal(mockArticles),
    totalTaxes: signal(mockArticles.reduce((sum, a) => sum + a.tax, 0)),
    totalTTC: signal(mockArticles.reduce((sum, a) => sum + a.pTTC, 0)),
    getPanierDetails: (articles: Article[]) => {
      return articles.map((a) => ({
        id: a.id,
        productName: a.productName,
        quantity: a.quantity,
        tax: a.tax,
        prixTTC: a.pTTC,
      }));
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanierComponent],
      providers: [{ provide: PanierService, useValue: mockPanierService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create composant', () => {
    expect(component).toBeTruthy();
  });

  it('should expose panier items via signal', () => {
    expect(component.items()).toEqual(mockArticles);
  });

  it('should calculate panier details', () => {
    const details = component.details();
    expect(details.length).toBe(2);
    expect(details[0]).toEqual(
      jasmine.objectContaining({ id: 1, quantity: 2, tax: 0.63, prixTTC: 5.0 })
    );
    expect(details[1]).toEqual(
      jasmine.objectContaining({ id: 2, quantity: 1, tax: 3, prixTTC: 18 })
    );
  });

  it('should calculate total of taxes', () => {
    expect(component.totalTaxes()).toBeCloseTo(0.63 + 3);
  });

  it('should calculate total TTC', () => {
    expect(component.totalTTC()).toBeCloseTo(5.0 + 18);
  });
});
