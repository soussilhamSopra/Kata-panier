import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PanierService } from '../../../core/services/panier.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compteur',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './compteur.component.html',
  styleUrls: ['./compteur.component.scss'],
})
export class CompteurComponent {
  private panierService = inject(PanierService);
  total = this.panierService.totalCount;
}
