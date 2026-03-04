import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormulaireUtilisateur } from './formulaire-utilisateur';
import { UtilisateurService } from '../../../core/services/utilisateur.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('FormulaireUtilisateur', () => {
  let composant: FormulaireUtilisateur;
  let fixture: ComponentFixture<FormulaireUtilisateur>;
  let utilisateurServiceSpy: jasmine.SpyObj<UtilisateurService>;

  beforeEach(async () => {
    utilisateurServiceSpy = jasmine.createSpyObj('UtilisateurService', [
      'recupererUtilisateurParId', 'creerClient', 'mettreAJourClient'
    ]);
    utilisateurServiceSpy.recupererUtilisateurParId.and.returnValue(
      of({ id: 1, nom: 'Alice', email: 'alice@email.com' })
    );
    utilisateurServiceSpy.creerClient.and.returnValue(
      of({ id: 2, nom: 'Bob', email: 'bob@email.com' })
    );

    await TestBed.configureTestingModule({
      imports: [FormulaireUtilisateur],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        provideRouter([]),
        { provide: UtilisateurService, useValue: utilisateurServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: undefined } } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormulaireUtilisateur);
    composant = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create en mode création', () => {
    expect(composant).toBeTruthy();
    expect(composant.estEnModeModification).toBeFalse();
  });

  it('le formulaire est invalide si les champs sont vides', () => {
    composant.formulaireUtilisateur.setValue({ nom: '', email: '', telephone: '' });
    expect(composant.formulaireUtilisateur.invalid).toBeTrue();
  });

  it('le formulaire est valide avec les champs requis remplis', () => {
    composant.formulaireUtilisateur.setValue({ nom: 'Bob', email: 'bob@email.com', telephone: '' });
    expect(composant.formulaireUtilisateur.valid).toBeTrue();
  });

  it('soumettre en mode création appelle creerClient', () => {
    composant.formulaireUtilisateur.setValue({ nom: 'Bob', email: 'bob@email.com', telephone: '' });
    composant.soumettre();
    expect(utilisateurServiceSpy.creerClient).toHaveBeenCalled();
  });

  it('soumettre ne fait rien si le formulaire est invalide', () => {
    composant.formulaireUtilisateur.setValue({ nom: '', email: '', telephone: '' });
    composant.soumettre();
    expect(utilisateurServiceSpy.creerClient).not.toHaveBeenCalled();
  });
  
  it('annuler navigue vers /clients', () => {
    const routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    spyOn(routerSpy, 'navigate');
    composant.annuler();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/clients']);
  });

});
