import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { ListeRendezVous } from './liste-rendez-vous';
import { RendezVousService } from '../../../core/services/rendez-vous.service';
import { UtilisateurService } from '../../../core/services/utilisateur.service';

describe('ListeRendezVous', () => {
  let composant: ListeRendezVous;
  let fixture: ComponentFixture<ListeRendezVous>;
  let rendezVousServiceSpy: jasmine.SpyObj<RendezVousService>;
  let utilisateurServiceSpy: jasmine.SpyObj<UtilisateurService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    rendezVousServiceSpy = jasmine.createSpyObj('RendezVousService', [
      'recupererTousLesRendezVous', 'filtrerParStatut', 'filtrerParDate', 'filtrerParClient', 'changerStatut'
    ]);
    utilisateurServiceSpy = jasmine.createSpyObj('UtilisateurService', ['recupererTousLesClients']);

    rendezVousServiceSpy.recupererTousLesRendezVous.and.returnValue(of([]));
    utilisateurServiceSpy.recupererTousLesClients.and.returnValue(of([]));
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ListeRendezVous],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        provideRouter([]),
        { provide: RendezVousService, useValue: rendezVousServiceSpy },
        { provide: UtilisateurService, useValue: utilisateurServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeRendezVous);
    composant = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(composant).toBeTruthy();
  });

  it('chargerRendezVous filtre par statut si filtreStatut est défini', () => {
    rendezVousServiceSpy.filtrerParStatut.and.returnValue(of([]));
    composant.filtreStatut = 'HONORE';
    composant.chargerRendezVous();
    expect(rendezVousServiceSpy.filtrerParStatut).toHaveBeenCalledWith('HONORE');
  });

  it('chargerRendezVous filtre par date si filtreDate est défini', () => {
    rendezVousServiceSpy.filtrerParDate.and.returnValue(of([]));
    composant.filtreStatut = '';
    composant.filtreDate = '2026-03-05';
    composant.chargerRendezVous();
    expect(rendezVousServiceSpy.filtrerParDate).toHaveBeenCalledWith('2026-03-05');
  });

  it('chargerRendezVous filtre par client si filtreClientId est défini', () => {
    rendezVousServiceSpy.filtrerParClient.and.returnValue(of([]));
    composant.filtreStatut = '';
    composant.filtreDate = '';
    composant.filtreClientId = '1';
    composant.chargerRendezVous();
    expect(rendezVousServiceSpy.filtrerParClient).toHaveBeenCalledWith(1);
  });

  it('reinitialiserFiltres remet tous les filtres à vide', () => {
    composant.filtreStatut = 'HONORE';
    composant.filtreDate = '2026-03-05';
    composant.filtreClientId = '1';
    composant.reinitialiserFiltres();
    expect(composant.filtreStatut).toBe('');
    expect(composant.filtreDate).toBe('');
    expect(composant.filtreClientId).toBe('');
  });

  it('changerStatut appelle le service avec le bon id et statut', () => {
    const rendezVousTest = {
      id: 1,
      clientId: 1,
      dateRendezVous: '2026-03-05',
      heureRendezVous: '10:00:00',
      service: 'Coupe',
      statut: 'ANNULE'
    };
    rendezVousServiceSpy.changerStatut.and.returnValue(of(rendezVousTest));
    composant.changerStatut(1, 'ANNULE');
    expect(rendezVousServiceSpy.changerStatut).toHaveBeenCalledWith(1, 'ANNULE');
  });

  it('allerVersNouveauRendezVous navigue vers /rendez-vous/nouveau', () => {
    composant.allerVersNouveauRendezVous();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/rendez-vous/nouveau']);
  });

});
