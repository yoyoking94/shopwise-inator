import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionFidelite } from '../../model/transaction-fidelite.model';

@Injectable({
  providedIn: 'root'
})
export class FidelisationService {

  private urlApi = 'http://localhost:8080/api/fidelisation';

  constructor(private httpClient: HttpClient) { }

  recupererSoldePoints(clientId: number): Observable<number> {
    return this.httpClient.get<number>(`${this.urlApi}/clients/${clientId}/solde`);
  }

  recupererHistoriqueTransactions(clientId: number): Observable<TransactionFidelite[]> {
    return this.httpClient.get<TransactionFidelite[]>(`${this.urlApi}/clients/${clientId}/historique`);
  }
}
