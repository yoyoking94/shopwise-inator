import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur, UtilisateurCreation } from '../../model/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private urlApi = 'http://localhost:8080/api/utilisateurs';

  constructor(private httpClient: HttpClient) { }

  recupererTousLesClients(): Observable<Utilisateur[]> {
    return this.httpClient.get<Utilisateur[]>(`${this.urlApi}/clients`);
  }

  recupererUtilisateurParId(id: number): Observable<Utilisateur> {
    return this.httpClient.get<Utilisateur>(`${this.urlApi}/${id}`);
  }

  creerClient(utilisateur: UtilisateurCreation): Observable<Utilisateur> {
    return this.httpClient.post<Utilisateur>(`${this.urlApi}/clients`, utilisateur);
  }

  mettreAJourClient(id: number, utilisateur: UtilisateurCreation): Observable<Utilisateur> {
    return this.httpClient.put<Utilisateur>(`${this.urlApi}/clients/${id}`, utilisateur);
  }
}
