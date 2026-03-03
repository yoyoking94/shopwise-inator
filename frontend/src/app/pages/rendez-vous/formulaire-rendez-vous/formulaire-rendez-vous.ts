import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ClientService } from '../../../core/services/client.service';
import { RendezVousService } from '../../../core/services/rendez-vous.service';
import { Client } from '../../../model/client.model';

@Component({
  selector: 'app-formulaire-rendez-vous',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './formulaire-rendez-vous.html',
  styleUrl: './formulaire-rendez-vous.scss',
})
export class FormulaireRendezVous implements OnInit {
  formulaireRendezVous!: FormGroup;
  listeClients: Client[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private rendezVousService: RendezVousService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formulaireRendezVous = this.formBuilder.group({
      clientId: ['', Validators.required],
      dateRendezVous: ['', Validators.required],
      heureRendezVous: ['', Validators.required],
      service: ['', Validators.required]
    });

    this.clientService.recupererTousLesClients().subscribe(clients => {
      this.listeClients = clients;
    });
  }

  soumettre(): void {
    if (this.formulaireRendezVous.invalid) return;

    const valeurs = this.formulaireRendezVous.value;
    const rendezVous = {
      ...valeurs,
      dateRendezVous: new Date(valeurs.dateRendezVous).toISOString().split('T')[0]
    };

    this.rendezVousService.creerRendezVous(rendezVous).subscribe(() => {
      this.router.navigate(['/rendez-vous']);
    });
  }

  annuler(): void {
    this.router.navigate(['/rendez-vous']);
  }
}
