import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projet } from './projet.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private baseUrl =environment.baseUrl ;

  constructor(private http: HttpClient) {}
  getAllProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.baseUrl}/projet`);
  }

  getProjetById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.baseUrl}/projet/${id}`);
  }
  
  createProjet(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(`${this.baseUrl}/createProjet`, projet);
  }
  

  updateProjet(ProjetId: number, updateProjetData: Partial<Projet>): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateProjet/${ProjetId}`, updateProjetData);
  }
  deleteProjet(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteProjet/${id}`);
  }
  
}
