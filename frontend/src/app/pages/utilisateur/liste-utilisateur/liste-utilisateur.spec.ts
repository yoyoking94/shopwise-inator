import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ListeUtilisateur } from './liste-utilisateur';
import { UtilisateurService } from '../../../core/services/utilisateur.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('ListeUtilisateur', () => {
  let composant: ListeUtilisateur;
  let fixture: ComponentFixture<ListeUtilisateur>;
  let utilisateurServiceSpy: jasmine.SpyObj<UtilisateurService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const clientsSimules = [
    { id: 1, nom: 'Dupont', email: 'dupont@test.fr', role: 'CLIENT' },
    { id: 2, nom: 'Martin', email: 'martin@test.fr', role: 'CLIENT' }
  ];

  beforeEach(async () => {
    utilisateurServiceSpy = jasmine.createSpyObj('UtilisateurService', ['recupererTousLesClients']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    utilisateurServiceSpy.recupererTousLesClients.and.returnValue(of(clientsSimules));

    await TestBed.configureTestingModule({
      imports: [ListeUtilisateur],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        provideRouter([]),
        { provide: UtilisateurService, useValue: utilisateurServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeUtilisateur);
    composant = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(composant).toBeTruthy();
  });

  it('ngOnInit charge la liste des clients', () => {
    expect(utilisateurServiceSpy.recupererTousLesClients).toHaveBeenCalled();
    expect(composant.listeUtilisateur).toEqual(clientsSimules);
  });

  it('chargerClients affiche une erreur en console en cas d\'echec', () => {
    spyOn(console, 'error');
    utilisateurServiceSpy.recupererTousLesClients.and.returnValue(
      throwError(() => new Error('Erreur reseau'))
    );
    composant.chargerClients();
    expect(console.error).toHaveBeenCalled();
  });

  it('allerVersNouveauClient navigue vers /clients/nouveau', () => {
    composant.allerVersNouveauClient();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/clients/nouveau']);
  });

  it('allerVersModificationClient navigue vers la page de modification', () => {
    composant.allerVersModificationClient(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/clients', 1, 'modifier']);
  });

  it('allerVersFidelisation navigue vers la page de fidelisation', () => {
    composant.allerVersFidelisation(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/clients', 1, 'fidelisation']);
  });
});