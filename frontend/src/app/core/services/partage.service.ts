import { Injectable, signal, inject } from '@angular/core';
import { Utilisateur } from '../../model/utilisateur.model';
import { UtilisateurService } from './utilisateur.service';

@Injectable({
  providedIn: 'root',
})
export class PartageService {
  private utilisateurService = inject(UtilisateurService);
  private listeClients = signal<Utilisateur[]>([]);

  chargerClients() {
    if (this.listeClients().length === 0) {
      console.log('Charge clients...');
      this.utilisateurService.recupererTousLesClients().subscribe({
        next: (clients) => {
          console.log('Clients reçus:', clients);
          this.listeClients.set(clients);
        }
      });
    }
  }

  get clients() {
    return this.listeClients.asReadonly();
  }
}