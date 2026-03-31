import { TestBed } from '@angular/core/testing';
import { FidelisationService } from './fidelisation.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { TransactionFidelite } from '../../model/transaction-fidelite.model';

describe('FidelisationService', () => {
  let service: FidelisationService;
  let httpControleur: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FidelisationService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(FidelisationService);
    httpControleur = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpControleur.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('recupererSoldePoints envoie une requete GET et retourne le solde', () => {
    const clientId = 42;
    service.recupererSoldePoints(clientId).subscribe(solde => {
      expect(solde).toBe(150);
    });

    const requete = httpControleur.expectOne(
      `http://localhost:8080/api/fidelisation/clients/${clientId}/solde`
    );
    expect(requete.request.method).toBe('GET');
    requete.flush(150);
  });

  it('recupererHistoriqueTransactions envoie une requete GET et retourne les transactions', () => {
    const clientId = 42;
    const transactionsAttendues: TransactionFidelite[] = [
      { id: 1, clientId: 42, rendezVousId: 10, pointsAttribues: 10, dateTransaction: '2025-01-01' },
      { id: 2, clientId: 42, rendezVousId: 11, pointsAttribues: 5, dateTransaction: '2025-01-02' }
    ];

    service.recupererHistoriqueTransactions(clientId).subscribe(transactions => {
      expect(transactions).toEqual(transactionsAttendues);
    });

    const requete = httpControleur.expectOne(
      `http://localhost:8080/api/fidelisation/clients/${clientId}/historique`
    );
    expect(requete.request.method).toBe('GET');
    requete.flush(transactionsAttendues);
  });
});