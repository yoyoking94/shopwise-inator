import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { RendezVousService } from '../../../core/services/rendez-vous.service';
import { RendezVous } from '../../../model/rendez-vous.model';

@Component({
  selector: 'app-liste-rendez-vous',
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './liste-rendez-vous.html',
  styleUrl: './liste-rendez-vous.scss',
})
export class ListeRendezVous implements OnInit {
  listeRendezVous: RendezVous[] = [];
  colonnesAffichees = ['client', 'date', 'heure', 'service', 'statut', 'actions'];
  filtreStatut = '';

  constructor(
    private rendezVousService: RendezVousService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.chargerRendezVous();
  }

  chargerRendezVous(): void {
    if (this.filtreStatut) {
      this.rendezVousService.filtrerParStatut(this.filtreStatut).subscribe(liste => {
        this.listeRendezVous = liste;
      });
    } else {
      this.rendezVousService.recupererTousLesRendezVous().subscribe(liste => {
        this.listeRendezVous = liste;
      });
    }
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
