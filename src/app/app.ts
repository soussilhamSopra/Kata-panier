import { Component, LOCALE_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './features/navigation/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
})
export class App {
  protected readonly title = signal('panier-app');
}
