import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PanierService } from '../../../shared/service/panier.service';
import { Article } from '../../../models/article';
import { PanierItem } from '../../../models/panier-item';
import { NomArticlePipe } from '../../../shared/pipes/nom-article.pipe';

@Component({
  selector: 'app-panier-item',
  standalone: true,
  imports: [CommonModule, NomArticlePipe],
  templateUrl: './panier-item.component.html',
  styleUrls: ['./panier-item.scss'],
})
export class PanierItemComponent {
  @Input() item!: PanierItem;

  constructor(private panierService: PanierService) {}
  onRemove(id: number): void {
    this.panierService.remove(id);
  }
}
