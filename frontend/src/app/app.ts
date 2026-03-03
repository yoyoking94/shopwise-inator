import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ConnexionService } from './core/services/connexion.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
  constructor(
    private connexionService: ConnexionService,
    private router: Router
  ) { }

  estConnecte(): boolean {
    return this.connexionService.estConnecte();
  }

  estCommercant(): boolean {
    return this.connexionService.recupererUtilisateurConnecte()?.role === 'COMMERCANT';
  }

  estClient(): boolean {
    return this.connexionService.recupererUtilisateurConnecte()?.role === 'CLIENT';
  }

  seDeconnecter(): void {
    this.connexionService.seDeconnecter();
    this.router.navigate(['/connexion']);
  }
}
