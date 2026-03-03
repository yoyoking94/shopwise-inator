import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { RendezVousService } from '../../../core/services/rendez-vous.service';
import { UtilisateurService } from '../../../core/services/utilisateur.service';
import { RendezVous } from '../../../model/rendez-vous.model';
import { Utilisateur } from '../../../model/utilisateur.model';

@Component({
  selector: 'app-liste-rendez-vous',
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatSelectModule, MatFormFieldModule, MatInputModule],
  templateUrl: './liste-rendez-vous.html',
  styleUrl: './liste-rendez-vous.scss',
})
export class ListeRendezVous implements OnInit {
  listeRendezVous: RendezVous[] = [];
  listeClients: Utilisateur[] = [];
  colonnesAffichees = ['client', 'date', 'heure', 'service', 'statut', 'actions'];

  filtreStatut = '';
  filtreDate = '';
  filtreClientId = '';

  constructor(
    private rendezVousService: RendezVousService,
    private utilisateurService: UtilisateurService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.chargerRendezVous();
    this.utilisateurService.recupererTousLesClients().subscribe(clients => {
      this.listeClients = clients;
    });
  }

  chargerRendezVous(): void {
    if (this.filtreStatut) {
      this.rendezVousService.filtrerParStatut(this.filtreStatut).subscribe(liste => {
        this.listeRendezVous = liste;
      });
    } else if (this.filtreDate) {
      this.rendezVousService.filtrerParDate(this.filtreDate).subscribe(liste => {
        this.listeRendezVous = liste;
      });
    } else if (this.filtreClientId) {
      this.rendezVousService.filtrerParClient(Number(this.filtreClientId)).subscribe(liste => {
        this.listeRendezVous = liste;
      });
    } else {
      this.rendezVousService.recupererTousLesRendezVous().subscribe(liste => {
        this.listeRendezVous = liste;
      });
    }
  }

  reinitialiserFiltres(): void {
    this.filtreStatut = '';
    this.filtreDate = '';
    this.filtreClientId = '';
    this.chargerRendezVous();
  }

  changerStatut(id: number, statut: string): void {
    this.rendezVousService.changerStatut(id, statut).subscribe(() => {
      this.chargerRendezVous();
    });
  }

  allerVersNouveauRendezVous(): void {
    this.router.navigate(['/rendez-vous/nouveau']);
  }
}
