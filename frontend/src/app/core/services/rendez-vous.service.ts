import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RendezVous } from '../../model/rendez-vous.model';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  private urlApi = 'http://localhost:8080/api/rendez-vous';

  constructor(private httpClient: HttpClient) { }

  recupererTousLesRendezVous(): Observable<RendezVous[]> {
    return this.httpClient.get<RendezVous[]>(this.urlApi);
  }

  filtrerParStatut(statut: string): Observable<RendezVous[]> {
    const parametres = new HttpParams().set('statut', statut);
    return this.httpClient.get<RendezVous[]>(this.urlApi, { params: parametres });
  }

  filtrerParClient(clientId: number): Observable<RendezVous[]> {
    const parametres = new HttpParams().set('clientId', clientId);
    return this.httpClient.get<RendezVous[]>(this.urlApi, { params: parametres });
  }

  creerRendezVous(rendezVous: RendezVous): Observable<RendezVous> {
    return this.httpClient.post<RendezVous>(this.urlApi, rendezVous);
  }

  changerStatut(id: number, statut: string): Observable<RendezVous> {
    const parametres = new HttpParams().set('statut', statut);
    return this.httpClient.patch<RendezVous>(`${this.urlApi}/${id}/statut`, null, { params: parametres });
  }
}
