import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormulaireUtilisateur } from './formulaire-utilisateur';
import { UtilisateurService } from '../../../core/services/utilisateur.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('FormulaireUtilisateur - mode creation', () => {
  let composant: FormulaireUtilisateur;
  let fixture: ComponentFixture<FormulaireUtilisateur>;
  let utilisateurServiceSpy: jasmine.SpyObj<UtilisateurService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    utilisateurServiceSpy = jasmine.createSpyObj('UtilisateurService', [
      'recupererUtilisateurParId', 'creerClient', 'mettreAJourClient'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

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
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormulaireUtilisateur);
    composant = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create en mode creation', () => {
    expect(composant).toBeTruthy();
    expect(composant.estEnModeModification).toBeFalse();
  });

  it('le formulaire est invalide si les champs requis sont vides', () => {
    composant.formulaireUtilisateur.setValue({ nom: '', email: '', telephone: '' });
    expect(composant.formulaireUtilisateur.invalid).toBeTrue();
  });

  it('le formulaire est valide avec les champs requis remplis', () => {
    composant.formulaireUtilisateur.setValue({ nom: 'Bob', email: 'bob@email.com', telephone: '' });
    expect(composant.formulaireUtilisateur.valid).toBeTrue();
  });

  it('soumettre en mode creation appelle creerClient et redirige', () => {
    composant.formulaireUtilisateur.setValue({ nom: 'Bob', email: 'bob@email.com', telephone: '' });
    composant.soumettre();
    expect(utilisateurServiceSpy.creerClient).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/clients']);
  });

  it('soumettre ne fait rien si le formulaire est invalide', () => {
    composant.formulaireUtilisateur.setValue({ nom: '', email: '', telephone: '' });
    composant.soumettre();
    expect(utilisateurServiceSpy.creerClient).not.toHaveBeenCalled();
  });

  it('annuler navigue vers /clients', () => {
    composant.annuler();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/clients']);
  });
});

describe('FormulaireUtilisateur - mode modification', () => {
  let composant: FormulaireUtilisateur;
  let fixture: ComponentFixture<FormulaireUtilisateur>;
  let utilisateurServiceSpy: jasmine.SpyObj<UtilisateurService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    utilisateurServiceSpy = jasmine.createSpyObj('UtilisateurService', [
      'recupererUtilisateurParId', 'creerClient', 'mettreAJourClient'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    utilisateurServiceSpy.recupererUtilisateurParId.and.returnValue(
      of({ id: 1, nom: 'Alice', email: 'alice@email.com' })
    );
    utilisateurServiceSpy.mettreAJourClient.and.returnValue(
      of({ id: 1, nom: 'Alice', email: 'alice@email.com' })
    );

    await TestBed.configureTestingModule({
      imports: [FormulaireUtilisateur],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        provideRouter([]),
        { provide: UtilisateurService, useValue: utilisateurServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 1 } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormulaireUtilisateur);
    composant = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create en mode modification', () => {
    expect(composant.estEnModeModification).toBeTrue();
  });

  it('ngOnInit charge les donnees du client existant', () => {
    expect(utilisateurServiceSpy.recupererUtilisateurParId).toHaveBeenCalledWith(1);
    expect(composant.formulaireUtilisateur.value.nom).toBe('Alice');
  });

  it('soumettre en mode modification appelle mettreAJourClient et redirige', () => {
    composant.formulaireUtilisateur.setValue({ nom: 'Alice', email: 'alice@email.com', telephone: '' });
    composant.soumettre();
    expect(utilisateurServiceSpy.mettreAJourClient).toHaveBeenCalledWith(1, jasmine.any(Object));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/clients']);
  });
});