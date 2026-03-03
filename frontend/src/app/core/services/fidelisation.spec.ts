import { TestBed } from '@angular/core/testing';

import { Fidelisation } from './fidelisation';

describe('Fidelisation', () => {
  let service: Fidelisation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fidelisation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
