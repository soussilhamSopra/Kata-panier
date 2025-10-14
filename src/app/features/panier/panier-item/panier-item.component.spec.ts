import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanierItemComponent } from './panier-item.component';
import { PanierService } from '../../../shared/service/panier.service';
import { Article } from '../../../models/article';
import { PanierItem } from '../../../models/panier-item';

describe('PanierItemComponent', () => {
  let component: PanierItemComponent;
  let fixture: ComponentFixture<PanierItemComponent>;
  let mockPanierService: jasmine.SpyObj<PanierService>;

  const mockItem: PanierItem = {
    id: 42,
    nom: 'Test Produit',
    prixHT: 10,
    quantite: 3,
    pTTC: 12,
    tax: 2,
  };

  beforeEach(async () => {
    mockPanierService = jasmine.createSpyObj('PanierService', ['remove']);

    await TestBed.configureTestingModule({
      imports: [PanierItemComponent],
      providers: [{ provide: PanierService, useValue: mockPanierService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PanierItemComponent);
    component = fixture.componentInstance;

    component.item = mockItem;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct @Input values', () => {
    expect(component.item).toEqual(mockItem);
  });

  it('should call panierService.remove with correct id on onRemove', () => {
    component.onRemove(mockItem.id);
    expect(mockPanierService.remove).toHaveBeenCalledWith(mockItem.id);
  });
});
