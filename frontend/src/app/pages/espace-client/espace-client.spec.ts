import { TestBed, ComponentFixture } from '@angular/core/testing';
import { EspaceClient } from './espace-client';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

describe('EspaceClient', () => {
  let composant: EspaceClient;
  let fixture: ComponentFixture<EspaceClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspaceClient],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EspaceClient);
    composant = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(composant).toBeTruthy();
  });
});
