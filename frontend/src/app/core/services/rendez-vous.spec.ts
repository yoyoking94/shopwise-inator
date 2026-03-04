import { TestBed } from '@angular/core/testing';
import { RendezVousService } from './rendez-vous.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('RendezVous', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RendezVousService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(RendezVousService);
    expect(service).toBeTruthy();
  });
});
