import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ConnexionService } from './core/services/connexion.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    MatToolbarModule,
    MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
  private connexionService = inject(ConnexionService);
  private router = inject(Router);

  get estConnecte(): boolean {
    return this.connexionService.estConnecte();
  }

  get estCommercant(): boolean {
    return this.connexionService.recupererUtilisateurConnecte()?.role === 'COMMERCANT';
  }

  get estClient(): boolean {
    return this.connexionService.recupererUtilisateurConnecte()?.role === 'CLIENT';
  }

  seDeconnecter(): void {
    this.connexionService.seDeconnecter();
    this.router.navigate(['/connexion']);
  }
}
