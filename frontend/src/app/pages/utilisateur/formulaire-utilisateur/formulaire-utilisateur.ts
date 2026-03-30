import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UtilisateurService } from '../../../core/services/utilisateur.service';

@Component({
  selector: 'app-formulaire-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './formulaire-utilisateur.html',
  styleUrl: './formulaire-utilisateur.scss',
})
export class FormulaireUtilisateur implements OnInit {
  formulaireUtilisateur!: FormGroup;
  estEnModeModification = false;
  clientId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private utilisateurService: UtilisateurService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.formulaireUtilisateur = this.formBuilder.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['']
    });

    this.clientId = this.activatedRoute.snapshot.params['id'];
    if (this.clientId) {
      this.estEnModeModification = true;
      this.utilisateurService.recupererUtilisateurParId(this.clientId).subscribe(utilisateur => {
        this.formulaireUtilisateur.patchValue(utilisateur);
      });
    }

    this.changeDetectorRef.detectChanges();
  }

  soumettre(): void {
    if (this.formulaireUtilisateur.invalid) return;

    if (this.estEnModeModification) {
      this.utilisateurService.mettreAJourClient(this.clientId, this.formulaireUtilisateur.value).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    } else {
      this.utilisateurService.creerClient(this.formulaireUtilisateur.value).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    }
  }

  annuler(): void {
    this.router.navigate(['/clients']);
  }
}
