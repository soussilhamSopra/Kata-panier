import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../../core/models/article';
import { TaxCalculatorService } from '../../core/services/tax-calculator.service';

@Pipe({ name: 'prixTTC', standalone: true })
export class PrixTtcPipe implements PipeTransform {
  transform(article: Article): number {
    return TaxCalculatorService.calculerPrixTTC(article);
  }
}
