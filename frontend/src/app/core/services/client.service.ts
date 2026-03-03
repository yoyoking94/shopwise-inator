import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../model/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private urlApi = 'http://localhost:8080/api/clients';

  constructor(private httpClient: HttpClient) { }

  recupererTousLesClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.urlApi);
  }

  recupererClientParId(id: number): Observable<Client> {
    return this.httpClient.get<Client>(`${this.urlApi}/${id}`);
  }

  creerClient(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(this.urlApi, client);
  }

  mettreAJourClient(id: number, client: Client): Observable<Client> {
    return this.httpClient.put<Client>(`${this.urlApi}/${id}`, client);
  }
}
