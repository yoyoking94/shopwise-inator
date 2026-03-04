import { TestBed } from '@angular/core/testing';
import { FidelisationService } from './fidelisation.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Fidelisation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FidelisationService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(FidelisationService);
    expect(service).toBeTruthy();
  });
});
