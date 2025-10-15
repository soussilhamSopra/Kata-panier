import { TestBed } from '@angular/core/testing';
import { PanierService } from './panier.service';
import { Article } from '../../models/article';
import { TaxeCalculator } from './taxCalculator';

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

  it('devrait être créé', () => {
    expect(service).toBeTruthy();
  });

  it('devrait ajouter un article au panier', () => {
    service.add(mockArticle);
    const items = service.items();
    expect(items.length).toBe(1);
    expect(items[0].id).toBe(mockArticle.id);
    expect(items[0].quantity).toBe(2);
  });

  it('devrait cumuler la quantité si l’article existe déjà', () => {
    service.add(mockArticle);
    service.add({ ...mockArticle, quantity: 3 });
    const items = service.items();
    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(5);
  });

  it('devrait supprimer un article du panier', () => {
    service.add(mockArticle);
    service.remove(mockArticle.id);
    const items = service.items();
    expect(items.length).toBe(0);
  });

  it('devrait calculer le total des quantités', () => {
    service.add(mockArticle);
    service.add({ ...mockArticle, id: 2, quantity: 4 });
    expect(service.totalCount()).toBe(6);
  });

  it('devrait calculer les taxes totales', () => {
    spyOn(TaxeCalculator, 'calculateTaxe').and.returnValue(0.28);
    service.add(mockArticle);
    expect(service.totalTaxes()).toBeCloseTo(0.56, 2); // 0.28 × 2
  });

  it('devrait calculer le total TTC', () => {
    spyOn(TaxeCalculator, 'calculerPrixTTC').and.returnValue(1.68);
    service.add(mockArticle);
    expect(service.totalTTC()).toBeCloseTo(3.36, 2); // 1.68 × 2
  });

  it('devrait retourner les détails du panier', () => {
    const details = service.getPanierDetails([mockArticle]);
    expect(details.length).toBe(1);
    expect(details[0].nom).toBe('Stylo');
    expect(details[0].quantite).toBe(2);
    expect(details[0].prixHT).toBe(1.4);
    expect(details[0].pTTC).toBe(1.68);
    expect(details[0].tax).toBe(0.28);
  });
});
