import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../../models/article';
import { TaxeCalculator } from '../service/taxCalculator';

@Pipe({ name: 'prixTTC', standalone: true })
export class PrixTtcPipe implements PipeTransform {
  transform(article: Article): number {
    return TaxeCalculator.calculerPrixTTC(article);
  }
}
