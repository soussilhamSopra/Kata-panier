import { Routes } from '@angular/router';
import { CompteurComponent } from './features/navigation/compteur/compteur.component';

export const routes: Routes = [
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  {
    path: 'articles',
    loadChildren: () => import('./features/articles/articles.routes').then((m) => m.routes),
  },
  {
    path: 'panier',
    loadChildren: () => import('./features/panier/panier.routes').then((m) => m.routes),
  },
];
