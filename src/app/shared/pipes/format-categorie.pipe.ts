import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatCategorie', standalone: true })
export class FormatCategoriePipe implements PipeTransform {
  transform(categorie: string): string {
    switch (categorie.toLowerCase()) {
      case 'food':
        return 'Alimentaire';
      case 'medecine':
        return 'Médicament';
      case 'books':
        return 'Livre';
      default:
        return categorie.charAt(0).toUpperCase() + categorie.slice(1);
    }
  }
}
