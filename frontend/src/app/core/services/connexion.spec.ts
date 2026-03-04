import { TestBed } from '@angular/core/testing';
import { ConnexionService } from './connexion.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Connexion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConnexionService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(ConnexionService);
    expect(service).toBeTruthy();
  });
});
