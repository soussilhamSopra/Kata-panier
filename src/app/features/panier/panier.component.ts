import { Component, computed, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PanierService } from '../../shared/service/panier.service';
import { PanierItemComponent } from './panier-item/panier-item.component';
import { Article } from '../../models/article';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, RouterModule, PanierItemComponent],
  templateUrl: './panier.html',
  styleUrls: ['./panier.scss'],
})
export class PanierComponent {
  panierService = inject(PanierService);

  readonly items: Signal<Article[]> = this.panierService.items;

  readonly details = computed(() => this.panierService.getPanierDetails(this.items()));

  readonly totalTaxes = computed(() => this.panierService.totalTaxes());
  readonly totalTTC = computed(() => this.panierService.totalTTC());
  readonly totalCount = computed(() => this.panierService.totalCount());
}
