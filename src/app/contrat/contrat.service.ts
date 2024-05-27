import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contrat } from './contrat.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ContratService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllContrats(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.baseUrl}/contrats`);
  }

  getContratById(id: number): Observable<Contrat> {
    return this.http.get<Contrat>(`${this.baseUrl}/contrat/${id}`);
  }

  createContrat(contrat: Contrat): Observable<Contrat> {
    return this.http.post<Contrat>(`${this.baseUrl}/createContrat`, contrat);
  }

  updateContrat(id: number, contrat: Contrat): Observable<Contrat> {
    return this.http.put<Contrat>(`${this.baseUrl}/updateContrat`, contrat);
  }

  deleteContrat(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteContrat/${id}`);
  }

  getContratsByAoId(ao_id: number): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.baseUrl}/Contrats/${ao_id}`);
  }
}
