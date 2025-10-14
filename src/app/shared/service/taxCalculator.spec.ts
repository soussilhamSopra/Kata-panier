import { TaxeCalculator } from './taxCalculator';
import { Article } from '../../models/article';

describe('TaxeCalculator', () => {
  it('should apply 0% for Food and Medecine', () => {
    const a: Article = {
      id: 1,
      productName: 'X',
      price: 1.99,
      quantity: 1,
      isImported: false,
      category: 'Food',
      tax: 0,
      pTTC: 0,
    };
    expect(TaxeCalculator.calculateTaxe(a)).toBeCloseTo(0, 2);
  });

  it('should apply 10% for Books', () => {
    const a: Article = {
      id: 2,
      productName: 'Book',
      price: 12.49,
      quantity: 1,
      isImported: false,
      category: 'Books',
      tax: 0,
      pTTC: 0,
    };
    // Tax 10% => 1.249 -> arrondi aux 5 cents supérieurs = 1.25
    expect(TaxeCalculator.calculateTaxe(a)).toBeCloseTo(1.25, 2);
  });

  it('should add 5% import tax', () => {
    const a: Article = {
      id: 3,
      productName: 'Imported bottle',
      price: 10.0,
      quantity: 1,
      isImported: true,
      category: 'Other',
      tax: 0,
      pTTC: 0,
    };
    // 20% + 5% => taxes sur HT: 2.0 & 0.5 -> arrondi -> sum soit 2.5
    expect(TaxeCalculator.calculateTaxe(a)).toBeCloseTo(2.5, 2);
  });
});
