import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ClientService } from '../../../core/services/client.service';

@Component({
  selector: 'app-formulaire-client',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './formulaire-client.html',
  styleUrl: './formulaire-client.scss',
})
export class FormulaireClient implements OnInit {
  formulaireClient!: FormGroup;
  estEnModeModification = false;
  clientId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formulaireClient = this.formBuilder.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['']
    });

    this.clientId = this.activatedRoute.snapshot.params['id'];
    if (this.clientId) {
      this.estEnModeModification = true;
      this.clientService.recupererClientParId(this.clientId).subscribe(client => {
        this.formulaireClient.patchValue(client);
      });
    }
  }

  soumettre(): void {
    if (this.formulaireClient.invalid) return;

    if (this.estEnModeModification) {
      this.clientService.mettreAJourClient(this.clientId, this.formulaireClient.value).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    } else {
      this.clientService.creerClient(this.formulaireClient.value).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    }
  }

  annuler(): void {
    this.router.navigate(['/clients']);
  }
}
