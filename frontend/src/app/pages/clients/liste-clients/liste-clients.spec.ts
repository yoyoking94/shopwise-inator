import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeClients } from './liste-clients';

describe('ListeClients', () => {
  let component: ListeClients;
  let fixture: ComponentFixture<ListeClients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeClients]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeClients);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
