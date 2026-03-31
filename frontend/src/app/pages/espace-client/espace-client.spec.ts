import { TestBed, ComponentFixture } from '@angular/core/testing';
import { EspaceClient } from './espace-client';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ConnexionService } from '../../core/services/connexion.service';
import { FidelisationService } from '../../core/services/fidelisation.service';
import { UtilisateurService } from '../../core/services/utilisateur.service';

describe('EspaceClient', () => {
  let composant: EspaceClient;
  let fixture: ComponentFixture<EspaceClient>;
  let connexionServiceSpy: jasmine.SpyObj<ConnexionService>;
  let fidelisationServiceSpy: jasmine.SpyObj<FidelisationService>;
  let utilisateurServiceSpy: jasmine.SpyObj<UtilisateurService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const utilisateurConnecte = { id: 1, nom: 'Alice', email: 'alice@test.fr', role: 'CLIENT' };

  beforeEach(async () => {
    connexionServiceSpy = jasmine.createSpyObj('ConnexionService', [
      'recupererUtilisateurConnecte', 'seDeconnecter'
    ]);
    fidelisationServiceSpy = jasmine.createSpyObj('FidelisationService', [
      'recupererSoldePoints', 'recupererHistoriqueTransactions'
    ]);
    utilisateurServiceSpy = jasmine.createSpyObj('UtilisateurService', [
      'recupererUtilisateurParId'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    connexionServiceSpy.recupererUtilisateurConnecte.and.returnValue(utilisateurConnecte);
    utilisateurServiceSpy.recupererUtilisateurParId.and.returnValue(of(utilisateurConnecte));
    fidelisationServiceSpy.recupererSoldePoints.and.returnValue(of(200));
    fidelisationServiceSpy.recupererHistoriqueTransactions.and.returnValue(of([
      { id: 1, clientId: 1, rendezVousId: 10, pointsAttribues: 50, dateTransaction: '2025-01-01' }
    ]));

    await TestBed.configureTestingModule({
      imports: [EspaceClient],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        provideRouter([]),
        { provide: ConnexionService, useValue: connexionServiceSpy },
        { provide: FidelisationService, useValue: fidelisationServiceSpy },
        { provide: UtilisateurService, useValue: utilisateurServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EspaceClient);
    composant = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(composant).toBeTruthy();
  });

  it('ngOnInit charge les donnees de l\'utilisateur connecte', () => {
    expect(utilisateurServiceSpy.recupererUtilisateurParId).toHaveBeenCalledWith(1);
    expect(composant.utilisateur).toEqual(utilisateurConnecte);
  });

  it('ngOnInit charge le solde de points', () => {
    expect(fidelisationServiceSpy.recupererSoldePoints).toHaveBeenCalledWith(1);
    expect(composant.soldePoints).toBe(200);
  });

  it('ngOnInit charge l\'historique des transactions', () => {
    expect(fidelisationServiceSpy.recupererHistoriqueTransactions).toHaveBeenCalledWith(1);
    expect(composant.historiqueTransactions.length).toBe(1);
  });

  it('ngOnInit redirige vers /connexion si aucun utilisateur connecte', () => {
    connexionServiceSpy.recupererUtilisateurConnecte.and.returnValue(null);
    composant.ngOnInit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/connexion']);
  });

  it('ngOnInit redirige vers /connexion si le role n\'est pas CLIENT', () => {
    connexionServiceSpy.recupererUtilisateurConnecte.and.returnValue({
      id: 2, nom: 'Marc', email: 'marc@test.fr', role: 'COMMERCANT'
    });
    composant.ngOnInit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/connexion']);
  });

  it('ngOnInit affiche une erreur en console si le solde echoue', () => {
    connexionServiceSpy.recupererUtilisateurConnecte.and.returnValue(utilisateurConnecte);
    fidelisationServiceSpy.recupererSoldePoints.and.returnValue(throwError(() => new Error('Erreur')));
    spyOn(console, 'error');
    composant.ngOnInit();
    expect(console.error).toHaveBeenCalled();
  });

  it('seDeconnecter appelle le service et redirige vers /connexion', () => {
    composant.seDeconnecter();
    expect(connexionServiceSpy.seDeconnecter).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/connexion']);
  });
});