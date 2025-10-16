import { Injectable } from '@angular/core';
import { Article } from '../models/article';

@Injectable({ providedIn: 'root' })
export class TaxCalculatorService {
  //Récupere le rate en se basant sur la catégorie et l'import
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

  //Applique l’arrondi aux 5 centimes supérieurs
  static roundUpToNearestFiveCents(value: number): number {
    return Math.ceil(value * 20) / 20;
  }

  static calculateTaxe(article: Article): number {
    const rates = this.getApplicableTaxRates(article);
    //Pour chaque rate, calcule la taxe et arrondis-la aux 5 centimes supérieurs
    const tax = rates
      .map((rate) => this.roundUpToNearestFiveCents((article.price * rate) / 100))
      .reduce((sum, t) => sum + t, 0);

    return tax;
  }

  //Calcule le prix TTC en ajoutant la taxe calculée
  static calculerPrixTTC(article: Article): number {
    return +(article.price + this.calculateTaxe(article)).toFixed(2);
  }
}
