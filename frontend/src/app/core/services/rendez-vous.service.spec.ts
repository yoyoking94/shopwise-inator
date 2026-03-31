import { TestBed } from '@angular/core/testing';
import { RendezVousService } from './rendez-vous.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { RendezVous } from '../../model/rendez-vous.model';

describe('RendezVousService', () => {
  let service: RendezVousService;
  let httpControleur: HttpTestingController;

  const urlApi = 'http://localhost:8080/api/rendez-vous';

  const rendezVousSimule: RendezVous = {
    id: 1,
    clientId: 10,
    dateRendezVous: '2025-06-01',
    heureRendezVous: '10:00',
    service: 'Consultation',
    statut: 'EN_ATTENTE'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RendezVousService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(RendezVousService);
    httpControleur = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpControleur.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('recupererTousLesRendezVous envoie une requete GET', () => {
    service.recupererTousLesRendezVous().subscribe(liste => {
      expect(liste).toEqual([rendezVousSimule]);
    });
    const requete = httpControleur.expectOne(urlApi);
    expect(requete.request.method).toBe('GET');
    requete.flush([rendezVousSimule]);
  });

  it('filtrerParDate envoie une requete GET avec le parametre date', () => {
    const date = '2025-06-01';
    service.filtrerParDate(date).subscribe();
    const requete = httpControleur.expectOne(`${urlApi}?date=${date}`);
    expect(requete.request.method).toBe('GET');
    requete.flush([]);
  });

  it('filtrerParStatut envoie une requete GET avec le parametre statut', () => {
    service.filtrerParStatut('EN_ATTENTE').subscribe();
    const requete = httpControleur.expectOne(`${urlApi}?statut=EN_ATTENTE`);
    expect(requete.request.method).toBe('GET');
    requete.flush([]);
  });

  it('filtrerParClient envoie une requete GET avec le parametre clientId', () => {
    service.filtrerParClient(10).subscribe();
    const requete = httpControleur.expectOne(`${urlApi}?clientId=10`);
    expect(requete.request.method).toBe('GET');
    requete.flush([]);
  });

  it('creerRendezVous envoie une requete POST', () => {
    service.creerRendezVous(rendezVousSimule).subscribe(reponse => {
      expect(reponse).toEqual(rendezVousSimule);
    });
    const requete = httpControleur.expectOne(urlApi);
    expect(requete.request.method).toBe('POST');
    requete.flush(rendezVousSimule);
  });

  it('changerStatut envoie une requete PATCH avec le parametre statut', () => {
    service.changerStatut(1, 'CONFIRME').subscribe(reponse => {
      expect(reponse).toEqual(rendezVousSimule);
    });
    const requete = httpControleur.expectOne(`${urlApi}/1/statut?statut=CONFIRME`);
    expect(requete.request.method).toBe('PATCH');
    requete.flush(rendezVousSimule);
  });
});