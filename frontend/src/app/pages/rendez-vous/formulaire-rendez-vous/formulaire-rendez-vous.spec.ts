import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormulaireRendezVous } from './formulaire-rendez-vous';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

describe('FormulaireRendezVous', () => {
  let composant: FormulaireRendezVous;
  let fixture: ComponentFixture<FormulaireRendezVous>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireRendezVous],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormulaireRendezVous);
    composant = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(composant).toBeTruthy();
  });
});
