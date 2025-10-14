import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'quantiteRestante', standalone: true })
export class QuantiteRestantePipe implements PipeTransform {
  transform(stock: number, quantiteDansPanier: number) {
    return stock - quantiteDansPanier > 0 ? `${stock - quantiteDansPanier}` : 'Non Disponible';
  }
}
