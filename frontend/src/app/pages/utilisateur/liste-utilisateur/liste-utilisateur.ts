import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Utilisateur } from '../../../model/utilisateur.model';
import { UtilisateurService } from '../../../core/services/utilisateur.service';

@Component({
  selector: 'app-liste-utilisateur',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './liste-utilisateur.html',
  styleUrl: './liste-utilisateur.scss',
})
export class ListeUtilisateur implements OnInit {
  listeUtilisateur: Utilisateur[] = [];
  colonnesAffichees = ['nom', 'email', 'telephone', 'actions'];

  constructor(
    private UtilisateurService: UtilisateurService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.chargerClients();
  }

  chargerClients(): void {
    this.UtilisateurService.recupererTousLesClients().subscribe({
      next: (utilisateur) => {
        this.listeUtilisateur = utilisateur;
        this.changeDetectorRef.detectChanges();
      },
      error: (err) => console.error('Erreur clients:', err)
    });
  }

  allerVersNouveauClient(): void {
    this.router.navigate(['/clients/nouveau']);
  }

  allerVersModificationClient(id: number): void {
    this.router.navigate(['/clients', id, 'modifier']);
  }

  allerVersFidelisation(id: number): void {
    this.router.navigate(['/clients', id, 'fidelisation']);
  }
}
