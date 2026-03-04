import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ListeUtilisateur } from './liste-utilisateur';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';

describe('ListeUtilisateur', () => {
  let composant: ListeUtilisateur;
  let fixture: ComponentFixture<ListeUtilisateur>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [ListeUtilisateur],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        provideRouter([]),
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

  it('allerVersNouveauClient navigue vers /clients/nouveau', () => {
    composant.allerVersNouveauClient();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/clients/nouveau']);
  });

});
