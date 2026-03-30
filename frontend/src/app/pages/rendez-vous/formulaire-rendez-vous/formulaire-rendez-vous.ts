import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UtilisateurService } from '../../../core/services/utilisateur.service';
import { RendezVousService } from '../../../core/services/rendez-vous.service';
import { Utilisateur } from '../../../model/utilisateur.model';

@Component({
  selector: 'app-formulaire-rendez-vous',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTimepickerModule],
  templateUrl: './formulaire-rendez-vous.html',
  styleUrl: './formulaire-rendez-vous.scss',
})
export class FormulaireRendezVous implements OnInit {
  formulaireRendezVous!: FormGroup;
  listeClients: Utilisateur[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private utilisateurService: UtilisateurService,
    private rendezVousService: RendezVousService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.formulaireRendezVous = this.formBuilder.group({
      clientId: ['', Validators.required],
      dateRendezVous: [null, Validators.required],
      heureRendezVous: [null, Validators.required],
      service: ['', Validators.required],
    });

    this.utilisateurService.recupererTousLesClients().subscribe(utilisateur => {
      this.listeClients = utilisateur;
    });

    this.changeDetectorRef.detectChanges();
  }

  soumettre(): void {
    if (this.formulaireRendezVous.invalid) return;

    const valeurs = this.formulaireRendezVous.value;

    const dateFormatee = new Date(valeurs.dateRendezVous).toISOString().split('T')[0];

    const heureDate: Date = valeurs.heureRendezVous;
    const heureFormatee = heureDate
      ? heureDate.toTimeString().split(' ')[0]
      : null;

    const rendezVous = {
      clientId: valeurs.clientId,
      service: valeurs.service,
      dateRendezVous: dateFormatee,
      heureRendezVous: heureFormatee,
    };

    this.rendezVousService.creerRendezVous(rendezVous).subscribe(() => {
      this.router.navigate(['/rendez-vous']);
    });
  }

  annuler(): void {
    this.router.navigate(['/rendez-vous']);
  }
}
