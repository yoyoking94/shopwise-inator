import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DetailFidelisation } from './detail-fidelisation';
import { FidelisationService } from '../../../core/services/fidelisation.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { TransactionFidelite } from '../../../model/transaction-fidelite.model';

describe('DetailFidelisation', () => {
  let composant: DetailFidelisation;
  let fixture: ComponentFixture<DetailFidelisation>;
  let fidelisationServiceSpy: jasmine.SpyObj<FidelisationService>;

  const transactionsSimulees: TransactionFidelite[] = [
    { id: 1, clientId: 1, rendezVousId: 10, pointsAttribues: 50, dateTransaction: '2025-01-01' }
  ];

  beforeEach(async () => {
    fidelisationServiceSpy = jasmine.createSpyObj('FidelisationService', [
      'recupererSoldePoints',
      'recupererHistoriqueTransactions'
    ]);
    fidelisationServiceSpy.recupererSoldePoints.and.returnValue(of(150));
    fidelisationServiceSpy.recupererHistoriqueTransactions.and.returnValue(of(transactionsSimulees));

    await TestBed.configureTestingModule({
      imports: [DetailFidelisation],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        provideRouter([]),
        { provide: FidelisationService, useValue: fidelisationServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: 1 } } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailFidelisation);
    composant = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(composant).toBeTruthy();
  });

  it('ngOnInit charge le clientId depuis la route', () => {
    expect(composant.clientId).toBe(1);
  });

  it('chargerDonneesFidelisation charge le solde de points', () => {
    expect(fidelisationServiceSpy.recupererSoldePoints).toHaveBeenCalledWith(1);
    expect(composant.soldePoints).toBe(150);
  });

  it('chargerDonneesFidelisation charge l\'historique des transactions', () => {
    expect(fidelisationServiceSpy.recupererHistoriqueTransactions).toHaveBeenCalledWith(1);
    expect(composant.historiqueTransactions).toEqual(transactionsSimulees);
  });

  it('retourVersClients navigue vers /clients', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    composant.retourVersClients();
    expect(router.navigate).toHaveBeenCalledWith(['/clients']);
  });
});