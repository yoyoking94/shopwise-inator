import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFidelisation } from './detail-fidelisation';

describe('DetailFidelisation', () => {
  let component: DetailFidelisation;
  let fixture: ComponentFixture<DetailFidelisation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailFidelisation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailFidelisation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
