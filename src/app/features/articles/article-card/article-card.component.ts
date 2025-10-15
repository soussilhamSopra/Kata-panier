import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  LOCALE_ID,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article } from '../../../models/article';
import { PanierService } from '../../../shared/service/panier.service';
import { FormatCategoriePipe } from '../../../shared/pipes/format-categorie.pipe';
import { QuantiteRestantePipe } from '../../../shared/pipes/quantite-restante.pipe';
import { NomArticlePipe } from '../../../shared/pipes/nom-article.pipe';
import { PrixTtcPipe } from '../../../shared/pipes/prix-ttc.pipe';
import { TaxeCalculator } from '../../../shared/service/taxCalculator';
registerLocaleData(localeFr);

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FormatCategoriePipe,
    QuantiteRestantePipe,
    NomArticlePipe,
    PrixTtcPipe,
  ],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
})
export class ArticleCardComponent {
  @Input() article!: Article;
  @Output() ajout = new EventEmitter<Article>();

  // Signal réactif pour la quantité sélectionnée par l'utilisateur
  quantite = signal(1);

  private panierService = inject(PanierService);

  // Ajoute l'article au panier si la quantité demandée est valide
  ajouter(): void {
    const demandée = this.quantite();
    const dansPanier = this.quantiteDansPanier();
    const disponible = this.article.quantity;

    const reste = disponible - dansPanier;

    if (disponible > 0 && demandée > 0 && demandée <= reste) {
      this.panierService.add({
        id: this.article.id,
        productName: this.article.productName,
        price: this.article.price,
        pTTC: TaxeCalculator.calculerPrixTTC(this.article),
        tax: TaxeCalculator.calculateTaxe(this.article),
        quantity: demandée,
        category: this.article.category,
        isImported: this.article.isImported,
      });
    } else {
      console.warn('Quantité demandée dépasse le stock disponible');
    }
  }

  //Quantité deja présente dans le panier pour cet article
  quantiteDansPanier = computed(() => {
    const item = this.panierService.items().find((i) => i.id === this.article.id);
    return item?.quantity ?? 0;
  });

  // Quantité restante en stock après soustraction du panier

  getQuantiteRestante(): number {
    return this.article.quantity - this.quantiteDansPanier();
  }

  // Valide la quantité saisie par l'utilisateur et ajuste si nécessaire
  validerQuantite(): void {
    const max = this.getQuantiteRestante();
    if (this.quantite() > max) {
      this.quantite.set(max);
      console.warn('Quantité ajustée au stock disponible');
    }
  }

  //Retourne la classe CSS selon le stock restant
  getStockClass(): string {
    return this.getQuantiteRestante() === 0 ? 'stock-epuise' : 'stock-dispo';
  }
}
