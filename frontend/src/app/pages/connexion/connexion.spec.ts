import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Connexion } from './connexion';
import { ConnexionService } from '../../core/services/connexion.service';
import { Router } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('Connexion', () => {
  let composant: Connexion;
  let fixture: ComponentFixture<Connexion>;
  let connexionServiceSpy: jasmine.SpyObj<ConnexionService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    connexionServiceSpy = jasmine.createSpyObj('ConnexionService', [
      'connecter', 'sauvegarderSession', 'estConnecte', 'recupererUtilisateurConnecte', 'seDeconnecter'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    connexionServiceSpy.estConnecte.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [Connexion],
      providers: [
        { provide: ConnexionService, useValue: connexionServiceSpy },
        { provide: Router, useValue: routerSpy },
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Connexion);
    composant = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(composant).toBeTruthy();
  });

  it('soumettre avec identifiants valides redirige le commerçant', () => {
    connexionServiceSpy.connecter.and.returnValue(of({
      id: 1, nom: 'Marie', email: 'commercant@shopwise.com', role: 'COMMERCANT'
    }));
    connexionServiceSpy.recupererUtilisateurConnecte.and.returnValue({
      id: 1, nom: 'Marie', email: 'commercant@shopwise.com', role: 'COMMERCANT'
    });

    composant.formulaireConnexion.setValue({
      email: 'commercant@shopwise.com',
      motDePasse: 'shopwise123'
    });
    composant.soumettre();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/clients']);
  });

  it('soumettre avec identifiants valides redirige le client', () => {
    connexionServiceSpy.connecter.and.returnValue(of({
      id: 2, nom: 'Alice', email: 'alice@email.com', role: 'CLIENT'
    }));
    connexionServiceSpy.recupererUtilisateurConnecte.and.returnValue({
      id: 2, nom: 'Alice', email: 'alice@email.com', role: 'CLIENT'
    });

    composant.formulaireConnexion.setValue({
      email: 'alice@email.com',
      motDePasse: 'alice123'
    });
    composant.soumettre();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/mon-espace']);
  });

  it('soumettre avec mauvais identifiants affiche un message derreur', () => {
    connexionServiceSpy.connecter.and.returnValue(throwError(() => new Error('Erreur')));

    composant.formulaireConnexion.setValue({
      email: 'mauvais@email.com',
      motDePasse: 'mauvais'
    });
    composant.soumettre();

    expect(composant.messageErreur).toBe('Email ou mot de passe incorrect.');
  });

  it('ne soumet pas si le formulaire est invalide', () => {
    composant.formulaireConnexion.setValue({ email: '', motDePasse: '' });
    composant.soumettre();
    expect(connexionServiceSpy.connecter).not.toHaveBeenCalled();
  });
});
