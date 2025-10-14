import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'nomArticle', standalone: true })
export class NomArticlePipe implements PipeTransform {
  transform(nom: string): string {
    return nom || 'Nom non renseigné';
  }
}
