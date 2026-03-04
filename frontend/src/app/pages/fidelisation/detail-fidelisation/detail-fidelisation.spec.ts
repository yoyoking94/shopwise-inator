import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DetailFidelisation } from './detail-fidelisation';
import { FidelisationService } from '../../../core/services/fidelisation.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('DetailFidelisation', () => {
  let composant: DetailFidelisation;
  let fixture: ComponentFixture<DetailFidelisation>;
  let fidelisationServiceSpy: jasmine.SpyObj<FidelisationService>;

  beforeEach(async () => {
    fidelisationServiceSpy = jasmine.createSpyObj('FidelisationService', [
      'recupererSoldePoints',
      'recupererHistoriqueTransactions'
    ]);
    fidelisationServiceSpy.recupererSoldePoints.and.returnValue(of(0));
    fidelisationServiceSpy.recupererHistoriqueTransactions.and.returnValue(of([]));

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
          useValue: {
            snapshot: {
              params: { id: 1 }
            }
          }
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

  it('retourVersClients navigue vers /clients', () => {
    const routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    spyOn(routerSpy, 'navigate');
    composant.retourVersClients();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/clients']);
  });

});
