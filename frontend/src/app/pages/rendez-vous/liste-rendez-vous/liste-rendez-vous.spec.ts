import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRendezVous } from './liste-rendez-vous';

describe('ListeRendezVous', () => {
  let component: ListeRendezVous;
  let fixture: ComponentFixture<ListeRendezVous>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeRendezVous]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeRendezVous);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
