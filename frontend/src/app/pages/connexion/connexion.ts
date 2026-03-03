import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnexionService } from '../../core/services/connexion.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-connexion',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.scss',
})
export class Connexion implements OnInit {
  formulaireConnexion!: FormGroup;
  messageErreur = '';

  constructor(
    private formBuilder: FormBuilder,
    private connexionService: ConnexionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Si déjà connecté, on redirige directement
    if (this.connexionService.estConnecte()) {
      this.redirigerSelonRole();
    }

    this.formulaireConnexion = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required]
    });
  }

  soumettre(): void {
    if (this.formulaireConnexion.invalid) return;

    this.connexionService.connecter(this.formulaireConnexion.value).subscribe({
      next: (reponse) => {
        this.connexionService.sauvegarderSession(reponse);
        this.redirigerSelonRole();
      },
      error: () => {
        this.messageErreur = 'Email ou mot de passe incorrect.';
      }
    });
  }

  private redirigerSelonRole(): void {
    const utilisateur = this.connexionService.recupererUtilisateurConnecte();
    if (utilisateur?.role === 'COMMERCANT') {
      this.router.navigate(['/clients']);
    } else {
      this.router.navigate(['/mon-espace']);
    }
  }
}
