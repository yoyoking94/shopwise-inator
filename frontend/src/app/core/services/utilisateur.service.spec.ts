import { TestBed } from '@angular/core/testing';
import { UtilisateurService } from './utilisateur.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { Utilisateur, UtilisateurCreation } from '../../model/utilisateur.model';

describe('UtilisateurService', () => {
  let service: UtilisateurService;
  let httpControleur: HttpTestingController;

  const urlApi = 'http://localhost:8080/api/utilisateurs';

  const utilisateurSimule: Utilisateur = {
    id: 1,
    nom: 'Dupont',
    email: 'alice@test.fr',
    role: 'CLIENT'
  };

  const utilisateurCreation: UtilisateurCreation = {
    nom: 'Dupont',
    email: 'alice@test.fr',
    telephone: '0601020304'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UtilisateurService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UtilisateurService);
    httpControleur = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpControleur.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('recupererTousLesClients envoie une requete GET sur /clients', () => {
    service.recupererTousLesClients().subscribe(clients => {
      expect(clients).toEqual([utilisateurSimule]);
    });
    const requete = httpControleur.expectOne(`${urlApi}/clients`);
    expect(requete.request.method).toBe('GET');
    requete.flush([utilisateurSimule]);
  });

  it('recupererUtilisateurParId envoie une requete GET avec l\'id', () => {
    service.recupererUtilisateurParId(1).subscribe(utilisateur => {
      expect(utilisateur).toEqual(utilisateurSimule);
    });
    const requete = httpControleur.expectOne(`${urlApi}/1`);
    expect(requete.request.method).toBe('GET');
    requete.flush(utilisateurSimule);
  });

  it('creerClient envoie une requete POST sur /clients', () => {
    service.creerClient(utilisateurCreation).subscribe(reponse => {
      expect(reponse).toEqual(utilisateurSimule);
    });
    const requete = httpControleur.expectOne(`${urlApi}/clients`);
    expect(requete.request.method).toBe('POST');
    requete.flush(utilisateurSimule);
  });

  it('mettreAJourClient envoie une requete PUT avec l\'id', () => {
    service.mettreAJourClient(1, utilisateurCreation).subscribe(reponse => {
      expect(reponse).toEqual(utilisateurSimule);
    });
    const requete = httpControleur.expectOne(`${urlApi}/clients/1`);
    expect(requete.request.method).toBe('PUT');
    requete.flush(utilisateurSimule);
  });
});