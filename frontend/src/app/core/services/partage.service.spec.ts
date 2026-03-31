import { TestBed } from '@angular/core/testing';
import { PartageService } from './partage.service';
import { UtilisateurService } from './utilisateur.service';
import { of } from 'rxjs';
import { Utilisateur } from '../../model/utilisateur.model';

describe('PartageService', () => {
  let service: PartageService;
  let utilisateurServiceMock: jasmine.SpyObj<UtilisateurService>;

  const clientsSimules: Utilisateur[] = [
    { id: 1, nom: 'Dupont', email: 'alice@test.fr', role: 'CLIENT' },
    { id: 2, nom: 'Martin', email: 'bob@test.fr', role: 'CLIENT' }
  ];

  beforeEach(() => {
    utilisateurServiceMock = jasmine.createSpyObj('UtilisateurService', [
      'recupererTousLesClients'
    ]);

    TestBed.configureTestingModule({
      providers: [
        PartageService,
        { provide: UtilisateurService, useValue: utilisateurServiceMock }
      ]
    });
    service = TestBed.inject(PartageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('clients retourne une liste vide au depart', () => {
    expect(service.clients()).toEqual([]);
  });

  it('chargerClients appelle le service et remplit la liste', () => {
    utilisateurServiceMock.recupererTousLesClients.and.returnValue(of(clientsSimules));
    service.chargerClients();
    expect(utilisateurServiceMock.recupererTousLesClients).toHaveBeenCalledTimes(1);
    expect(service.clients()).toEqual(clientsSimules);
  });

  it('chargerClients n\'appelle pas le service si la liste est deja chargee', () => {
    utilisateurServiceMock.recupererTousLesClients.and.returnValue(of(clientsSimules));
    service.chargerClients();
    service.chargerClients();
    expect(utilisateurServiceMock.recupererTousLesClients).toHaveBeenCalledTimes(1);
  });
});