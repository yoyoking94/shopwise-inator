import { TestBed } from '@angular/core/testing';
import { UtilisateurService } from './utilisateur.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Utilisateur', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UtilisateurService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(UtilisateurService);
    expect(service).toBeTruthy();
  });
});
