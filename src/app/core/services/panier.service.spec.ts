import { TestBed } from '@angular/core/testing';
import { PanierService } from './panier.service';
import { Article } from '../models/article';
import { TaxCalculatorService } from './tax-calculator.service';

describe('PanierService', () => {
  let service: PanierService;

  const mockArticle: Article = {
    id: 1,
    productName: 'Stylo',
    price: 1.4,
    quantity: 2,
    category: 'papeterie',
    isImported: false,
    pTTC: 1.68,
    tax: 0.28,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PanierService],
    });
    service = TestBed.inject(PanierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an article to panier', () => {
    service.add(mockArticle);
    const items = service.items();
    expect(items.length).toBe(1);
    expect(items[0].id).toBe(mockArticle.id);
    expect(items[0].quantity).toBe(2);
  });

  it('should accumulate the quantity if the article already existe', () => {
    service.add(mockArticle);
    service.add({ ...mockArticle, quantity: 3 });
    const items = service.items();
    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(5);
  });

  it('should remove an article from panier', () => {
    service.add(mockArticle);
    service.remove(mockArticle.id);
    const items = service.items();
    expect(items.length).toBe(0);
  });

  it('should calculate the total of quantities', () => {
    service.add(mockArticle);
    service.add({ ...mockArticle, id: 2, quantity: 4 });
    expect(service.totalCount()).toBe(6);
  });

  it('should calculate the total of taxes', () => {
    spyOn(TaxCalculatorService, 'calculateTaxe').and.returnValue(0.28);
    service.add(mockArticle);
    expect(service.totalTaxes()).toBeCloseTo(0.56, 2); // 0.28 × 2
  });

  it('should calculate the total TTC', () => {
    spyOn(TaxCalculatorService, 'calculerPrixTTC').and.returnValue(1.68);
    service.add(mockArticle);
    expect(service.totalTTC()).toBeCloseTo(3.36, 2); // 1.68 × 2
  });

  it('should retourn  details of panier', () => {
    const details = service.getPanierDetails([mockArticle]);
    expect(details.length).toBe(1);
    expect(details[0].nom).toBe('Stylo');
    expect(details[0].quantite).toBe(2);
    expect(details[0].prixHT).toBe(1.4);
    expect(details[0].pTTC).toBe(1.68);
    expect(details[0].tax).toBe(0.28);
  });
});
