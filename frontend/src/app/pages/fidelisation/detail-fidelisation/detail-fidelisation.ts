import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FidelisationService } from '../../../core/services/fidelisation.service';
import { TransactionFidelite } from '../../../model/transaction-fidelite.model';

@Component({
  selector: 'app-detail-fidelisation',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatTableModule, MatIconModule],
  templateUrl: './detail-fidelisation.html',
  styleUrl: './detail-fidelisation.scss',
})
export class DetailFidelisation implements OnInit {
  clientId!: number;
  soldePoints = 0;
  historiqueTransactions: TransactionFidelite[] = [];
  colonnesAffichees = ['date', 'points'];

  constructor(
    private fidelisationService: FidelisationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clientId = this.activatedRoute.snapshot.params['id'];
    this.chargerDonneesFidelisation();
  }

  chargerDonneesFidelisation(): void {
    this.fidelisationService.recupererSoldePoints(this.clientId).subscribe(solde => {
      this.soldePoints = solde;
    });

    this.fidelisationService.recupererHistoriqueTransactions(this.clientId).subscribe(transactions => {
      this.historiqueTransactions = transactions;
    });
  }

  retourVersClients(): void {
    this.router.navigate(['/clients']);
  }
}
