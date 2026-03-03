import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListeUtilisateur } from './liste-utilisateur';


describe('ListeUtilisateur', () => {
  let component: ListeUtilisateur;
  let fixture: ComponentFixture<ListeUtilisateur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeUtilisateur]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListeUtilisateur);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
