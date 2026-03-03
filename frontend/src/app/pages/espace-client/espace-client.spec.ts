import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceClient } from './espace-client';

describe('EspaceClient', () => {
  let component: EspaceClient;
  let fixture: ComponentFixture<EspaceClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspaceClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
