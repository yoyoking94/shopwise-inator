import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { Router } from "@angular/router";
import { ConnexionService } from "../../core/services/connexion.service";
import { FidelisationService } from "../../core/services/fidelisation.service";
import { UtilisateurService } from "../../core/services/utilisateur.service";
import { TransactionFidelite } from "../../model/transaction-fidelite.model";
import { Utilisateur } from "../../model/utilisateur.model";


@Component({
  selector: 'app-espace-client',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatTableModule, MatIconModule, MatDividerModule],
  templateUrl: './espace-client.html',
  styleUrl: './espace-client.scss',
})
export class EspaceClient implements OnInit {

  utilisateur: Utilisateur | undefined;
  soldePoints = 0;
  historiqueTransactions: TransactionFidelite[] = [];
  colonnesAffichees = ['date', 'points'];

  constructor(
    private connexionService: ConnexionService,
    private fidelisationService: FidelisationService,
    private utilisateurService: UtilisateurService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const utilisateurConnecte = this.connexionService.recupererUtilisateurConnecte();

    if (!utilisateurConnecte || utilisateurConnecte.role !== 'CLIENT') {
      this.router.navigate(['/connexion']);
      return;
    }

    this.utilisateurService.recupererUtilisateurParId(utilisateurConnecte.id).subscribe(infos => {
      this.utilisateur = infos;
      this.changeDetectorRef.detectChanges();
    });

    this.fidelisationService.recupererSoldePoints(utilisateurConnecte.id).subscribe({
      next: (solde) => { this.soldePoints = solde; this.changeDetectorRef.detectChanges(); },
      error: (err) => console.error('Erreur solde:', err)
    });

    this.fidelisationService.recupererHistoriqueTransactions(utilisateurConnecte.id).subscribe(transactions => {
      this.historiqueTransactions = transactions;
      this.changeDetectorRef.detectChanges();
    });
  }

  seDeconnecter(): void {
    this.connexionService.seDeconnecter();
    this.router.navigate(['/connexion']);
  }
}