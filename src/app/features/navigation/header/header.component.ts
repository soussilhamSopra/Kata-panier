import { Component } from '@angular/core';
import { CompteurComponent } from '../compteur/compteur.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, CompteurComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(public router: Router) {}

  isOnPanierPage(): boolean {
    return this.router.url.includes('/panier');
  }

  isOnArticlesPage(): boolean {
    return this.router.url.includes('/articles');
  }
}
