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

  const rendezVousSimule = {
    id: 1, clientId: 1, dateRendezVous: '2026-03-05',
    heureRendezVous: '10:00', service: 'Coupe', statut: 'EN_ATTENTE'
  };

  beforeEach(async () => {
    rendezVousServiceSpy = jasmine.createSpyObj('RendezVousService', [
      'recupererTousLesRendezVous', 'filtrerParStatut', 'filtrerParDate',
      'filtrerParClient', 'changerStatut'
    ]);
    utilisateurServiceSpy = jasmine.createSpyObj('UtilisateurService', ['recupererTousLesClients']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    rendezVousServiceSpy.recupererTousLesRendezVous.and.returnValue(of([rendezVousSimule]));
    utilisateurServiceSpy.recupererTousLesClients.and.returnValue(of([
      { id: 1, nom: 'Dupont', email: 'dupont@test.fr', role: 'CLIENT' }
    ]));

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

  it('ngOnInit charge la liste des rendez-vous', () => {
    expect(rendezVousServiceSpy.recupererTousLesRendezVous).toHaveBeenCalled();
    expect(composant.listeRendezVous).toEqual([rendezVousSimule]);
  });

  it('ngOnInit charge la liste des clients', () => {
    expect(utilisateurServiceSpy.recupererTousLesClients).toHaveBeenCalled();
    expect(composant.listeClients.length).toBe(1);
  });

  it('chargerRendezVous filtre par statut si filtreStatut est defini', () => {
    rendezVousServiceSpy.filtrerParStatut.and.returnValue(of([]));
    composant.filtreStatut = 'HONORE';
    composant.chargerRendezVous();
    expect(rendezVousServiceSpy.filtrerParStatut).toHaveBeenCalledWith('HONORE');
  });

  it('chargerRendezVous filtre par date si filtreDate est defini', () => {
    rendezVousServiceSpy.filtrerParDate.and.returnValue(of([]));
    composant.filtreStatut = '';
    composant.filtreDate = '2026-03-05';
    composant.chargerRendezVous();
    expect(rendezVousServiceSpy.filtrerParDate).toHaveBeenCalledWith('2026-03-05');
  });

  it('chargerRendezVous filtre par client si filtreClientId est defini', () => {
    rendezVousServiceSpy.filtrerParClient.and.returnValue(of([]));
    composant.filtreStatut = '';
    composant.filtreDate = '';
    composant.filtreClientId = '1';
    composant.chargerRendezVous();
    expect(rendezVousServiceSpy.filtrerParClient).toHaveBeenCalledWith(1);
  });

  it('obtenirNomClient retourne le nom du client si trouve', () => {
    composant.listeClients = [{ id: 1, nom: 'Dupont', email: 'dupont@test.fr' }];
    expect(composant.obtenirNomClient(1)).toBe('Dupont');
  });

  it('obtenirNomClient retourne "Client inconnu" si non trouve', () => {
    composant.listeClients = [];
    expect(composant.obtenirNomClient(99)).toBe('Client inconnu');
  });

  it('reinitialiserFiltres remet tous les filtres a vide', () => {
    composant.filtreStatut = 'HONORE';
    composant.filtreDate = '2026-03-05';
    composant.filtreClientId = '1';
    composant.reinitialiserFiltres();
    expect(composant.filtreStatut).toBe('');
    expect(composant.filtreDate).toBe('');
    expect(composant.filtreClientId).toBe('');
  });

  it('changerStatut appelle le service puis recharge les rendez-vous', () => {
    rendezVousServiceSpy.changerStatut.and.returnValue(of(rendezVousSimule));
    composant.changerStatut(1, 'ANNULE');
    expect(rendezVousServiceSpy.changerStatut).toHaveBeenCalledWith(1, 'ANNULE');
    expect(rendezVousServiceSpy.recupererTousLesRendezVous).toHaveBeenCalled();
  });

  it('allerVersNouveauRendezVous navigue vers /rendez-vous/nouveau', () => {
    composant.allerVersNouveauRendezVous();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/rendez-vous/nouveau']);
  });
});