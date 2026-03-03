import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Client } from '../../../model/client.model';
import { ClientService } from '../../../core/services/client.service';

@Component({
  selector: 'app-liste-clients',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './liste-clients.html',
  styleUrl: './liste-clients.scss',
})
export class ListeClients implements OnInit {
  listeClients: Client[] = [];
  colonnesAffichees = ['nom', 'email', 'telephone', 'actions'];

  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.chargerClients();
  }

  chargerClients(): void {
    this.clientService.recupererTousLesClients().subscribe(clients => {
      this.listeClients = clients;
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
