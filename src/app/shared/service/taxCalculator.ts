import { Article } from '../../models/article';

export class TaxeCalculator {
  static getApplicableTaxRates(article: Article): number[] {
    const rates: number[] = [];

    switch (article.category) {
      case 'Food':
      case 'Medecine':
        break;
      case 'Books':
        rates.push(10);
        break;
      default:
        rates.push(20);
        break;
    }

    if (article.isImported) {
      rates.push(5);
    }

    return rates;
  }

  static roundUpToNearestFiveCents(value: number): number {
    return Math.ceil(value * 20) / 20;
  }
  static calculateTaxe(article: Article): number {
    const rates = this.getApplicableTaxRates(article);
    const totalRate = rates.reduce((sum, r) => sum + r, 0);
    const tax = rates
      .map((rate) => this.roundUpToNearestFiveCents((article.price * rate) / 100))
      .reduce((sum, t) => sum + t, 0);

    return tax;
  }

  static calculerPrixTTC(article: Article): number {
    return +(article.price + this.calculateTaxe(article)).toFixed(2);
  }
}
