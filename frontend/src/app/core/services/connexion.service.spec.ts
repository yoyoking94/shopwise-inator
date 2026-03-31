import { TestBed } from '@angular/core/testing';
import { ConnexionService } from './connexion.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { ConnexionDemande, ConnexionReponse } from '../../model/utilisateur.model';

describe('ConnexionService', () => {
  let service: ConnexionService;
  let httpControleur: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConnexionService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ConnexionService);
    httpControleur = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpControleur.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('connecter envoie une requete POST et retourne une ConnexionReponse', () => {
    const demande: ConnexionDemande = { email: 'test@test.fr', motDePasse: '1234' };
    const reponseAttendue: ConnexionReponse = {
      id: 1,
      nom: 'Dupont',
      email: 'test@test.fr',
      role: 'CLIENT'
    };

    service.connecter(demande).subscribe(reponse => {
      expect(reponse).toEqual(reponseAttendue);
    });

    const requete = httpControleur.expectOne('http://localhost:8080/api/connexion');
    expect(requete.request.method).toBe('POST');
    requete.flush(reponseAttendue);
  });

  it('sauvegarderSession enregistre l\'utilisateur dans le localStorage', () => {
    const utilisateur: ConnexionReponse = {
      id: 1,
      nom: 'Dupont',
      email: 'test@test.fr',
      role: 'CLIENT'
    };
    service.sauvegarderSession(utilisateur);
    const donneesSauvegardees = localStorage.getItem('utilisateurConnecte');
    expect(donneesSauvegardees).toEqual(JSON.stringify(utilisateur));
  });

  it('recupererUtilisateurConnecte retourne l\'utilisateur depuis le localStorage', () => {
    const utilisateur: ConnexionReponse = {
      id: 1,
      nom: 'Dupont',
      email: 'test@test.fr',
      role: 'CLIENT'
    };
    localStorage.setItem('utilisateurConnecte', JSON.stringify(utilisateur));
    expect(service.recupererUtilisateurConnecte()).toEqual(utilisateur);
  });

  it('recupererUtilisateurConnecte retourne null si aucune session', () => {
    expect(service.recupererUtilisateurConnecte()).toBeNull();
  });

  it('seDeconnecter supprime l\'utilisateur du localStorage', () => {
    localStorage.setItem('utilisateurConnecte', JSON.stringify({ id: 1 }));
    service.seDeconnecter();
    expect(localStorage.getItem('utilisateurConnecte')).toBeNull();
  });

  it('estConnecte retourne true quand une session existe', () => {
    localStorage.setItem('utilisateurConnecte', JSON.stringify({ id: 1 }));
    expect(service.estConnecte()).toBeTrue();
  });

  it('estConnecte retourne false quand aucune session existe', () => {
    expect(service.estConnecte()).toBeFalse();
  });
});