import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PanierService } from '../../../shared/service/panier.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compteur',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './compteur.html',
  styleUrls: ['./compteur.scss'],
})
export class CompteurComponent {
  private panierService = inject(PanierService);
  total = this.panierService.totalCount;
}
