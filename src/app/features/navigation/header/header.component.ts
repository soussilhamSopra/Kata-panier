import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CompteurComponent } from '../compteur/compteur.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, CompteurComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  router = inject(Router);

  isOnPanierPage(): boolean {
    return this.router.url.includes('/panier');
  }

  isOnArticlesPage(): boolean {
    return this.router.url.includes('/articles');
  }
}
