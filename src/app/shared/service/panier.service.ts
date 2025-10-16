import { computed, Injectable, signal } from '@angular/core';
import { Article } from '../../models/article';
import { PanierItem } from '../../models/panier-item';

@Injectable({ providedIn: 'root' })
export class PanierService {
  private _items = signal<Article[]>([]);
  items = computed(() => this._items());
  totalCount = computed(() => this._items().reduce((sum, item) => sum + item.quantity, 0));

  totalTaxes = computed(() => this._items().reduce((sum, item) => sum + item.tax, 0));

  totalTTC = computed(() => this._items().reduce((sum, item) => sum + item.pTTC, 0));

  getPanierDetails(items: Article[]): PanierItem[] {
    return items.map((item) => {
      return {
        id: item.id,
        nom: item.productName,
        quantite: item.quantity,
        prixHT: item.price,
        pTTC: item.pTTC,
        tax: item.tax,
      };
    });
  }
  add(item: Article) {
    const current = this._items();
    const existing = current.find((i) => i.id === item.id);
    if (existing) {
      const updated = { ...existing, quantity: existing.quantity + item.quantity };
      const newItems = current.map((i) => (i.id === item.id ? updated : i));
      this._items.set(newItems);
    } else {
      this._items.set([...current, { ...item }]);
    }
  }

  remove(id: number) {
    this._items.set(this._items().filter((i) => i.id !== id));
  }
}
