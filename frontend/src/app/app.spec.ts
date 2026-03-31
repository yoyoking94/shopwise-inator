import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConnexionService } from './core/services/connexion.service';

describe('App', () => {
  let composant: App;
  let connexionServiceMock: jasmine.SpyObj<ConnexionService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    connexionServiceMock = jasmine.createSpyObj('ConnexionService', [
      'estConnecte',
      'recupererUtilisateurConnecte',
      'seDeconnecter'
    ]);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: ConnexionService, useValue: connexionServiceMock },
        { provide: Router, useValue: routerMock }
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(App);
    composant = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(composant).toBeTruthy();
  });

  it('estConnecte retourne true quand l\'utilisateur est connecte', () => {
    connexionServiceMock.estConnecte.and.returnValue(true);
    expect(composant.estConnecte).toBeTrue();
  });

  it('estConnecte retourne false quand l\'utilisateur n\'est pas connecte', () => {
    connexionServiceMock.estConnecte.and.returnValue(false);
    expect(composant.estConnecte).toBeFalse();
  });

  it('estCommercant retourne true quand le role est COMMERCANT', () => {
    connexionServiceMock.recupererUtilisateurConnecte.and.returnValue({
      id: 1,
      nom: 'Dupont',
      email: 'test@test.fr',
      role: 'COMMERCANT'
    });
    expect(composant.estCommercant).toBeTrue();
  });

  it('estCommercant retourne false quand le role est CLIENT', () => {
    connexionServiceMock.recupererUtilisateurConnecte.and.returnValue({
      id: 1,
      nom: 'Dupont',
      email: 'test@test.fr',
      role: 'CLIENT'
    });
    expect(composant.estCommercant).toBeFalse();
  });

  it('estCommercant retourne false quand aucun utilisateur n\'est connecte', () => {
    connexionServiceMock.recupererUtilisateurConnecte.and.returnValue(null);
    expect(composant.estCommercant).toBeFalse();
  });

  it('estClient retourne true quand le role est CLIENT', () => {
    connexionServiceMock.recupererUtilisateurConnecte.and.returnValue({
      id: 1,
      nom: 'Dupont',
      email: 'test@test.fr',
      role: 'CLIENT'
    });
    expect(composant.estClient).toBeTrue();
  });

  it('estClient retourne false quand le role est COMMERCANT', () => {
    connexionServiceMock.recupererUtilisateurConnecte.and.returnValue({
      id: 1,
      nom: 'Dupont',
      email: 'test@test.fr',
      role: 'COMMERCANT'
    });
    expect(composant.estClient).toBeFalse();
  });

  it('estClient retourne false quand aucun utilisateur n\'est connecte', () => {
    connexionServiceMock.recupererUtilisateurConnecte.and.returnValue(null);
    expect(composant.estClient).toBeFalse();
  });

  it('seDeconnecter appelle seDeconnecter du service et redirige vers /connexion', () => {
    routerMock.navigate.and.returnValue(Promise.resolve(true));
    composant.seDeconnecter();
    expect(connexionServiceMock.seDeconnecter).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/connexion']);
  });
});