import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { PanierService } from '../../../core/services/panier.service';
import { Article } from '../../../core/models/article';
import { PanierItem } from '../../../core/models/panier-item';
import { NomArticlePipe } from '../../../shared/pipes/nom-article.pipe';

@Component({
  selector: 'app-panier-item',
  standalone: true,
  imports: [CommonModule, NomArticlePipe],
  templateUrl: './panier-item.component.html',
  styleUrls: ['./panier-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanierItemComponent {
  @Input() item!: PanierItem;
  panierService = inject(PanierService);

  onRemove(id: number): void {
    this.panierService.remove(id);
  }
}
