import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireRendezVous } from './formulaire-rendez-vous';

describe('FormulaireRendezVous', () => {
  let component: FormulaireRendezVous;
  let fixture: ComponentFixture<FormulaireRendezVous>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireRendezVous]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireRendezVous);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
