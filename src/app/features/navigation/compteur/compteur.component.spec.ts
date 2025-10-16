import { TestBed } from '@angular/core/testing';
import { CompteurComponent } from './compteur.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CompteurComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompteurComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CompteurComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
