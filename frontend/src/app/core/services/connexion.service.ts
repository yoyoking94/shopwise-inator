import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConnexionDemande, ConnexionReponse } from '../../model/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  private urlApi = 'http://localhost:8080/api/connexion';

  constructor(private httpClient: HttpClient) { }

  connecter(connexionDemande: ConnexionDemande): Observable<ConnexionReponse> {
    return this.httpClient.post<ConnexionReponse>(this.urlApi, connexionDemande);
  }

  sauvegarderSession(utilisateur: ConnexionReponse): void {
    localStorage.setItem('utilisateurConnecte', JSON.stringify(utilisateur));
  }

  recupererUtilisateurConnecte(): ConnexionReponse | null {
    const donnees = localStorage.getItem('utilisateurConnecte');
    return donnees ? JSON.parse(donnees) : null;
  }

  seDeconnecter(): void {
    localStorage.removeItem('utilisateurConnecte');
  }

  estConnecte(): boolean {
    return this.recupererUtilisateurConnecte() !== null;
  }
}
