import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireClient } from './formulaire-client';

describe('FormulaireClient', () => {
  let component: FormulaireClient;
  let fixture: ComponentFixture<FormulaireClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
