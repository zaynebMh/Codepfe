import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ao } from './ao.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AoService {
  
  private baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) {}

  getAllAOs(): Observable<Ao[]> {
    return this.http.get<Ao[]>(`${this.baseUrl}/aos`).pipe(
      catchError((error) => {
        console.error('Error fetching AOs:', error);
        return throwError('Error fetching AOs');
      })
    );
  }

  createAO(ao: Ao): Observable<Ao> {
    return this.http.post<Ao>(`${this.baseUrl}/createAO`, ao).pipe(
      catchError((error) => {
        console.error('Error creating AO:', error);
        return throwError('Error creating AO');
      })
    );
  }

  getAOById(id: number): Observable<Ao> {
    return this.http.get<Ao>(`${this.baseUrl}/ao/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching AO by ID:', error);
        return throwError('Error fetching AO by ID');
      })
    );
  }

  updateAO(ao: Ao): Observable<Ao> {
    return this.http.put<Ao>(`${this.baseUrl}/updateAO`, ao).pipe(
      catchError((error) => {
        console.error('Error updating AO:', error);
        return throwError('Error updating AO');
      })
    );
  }

  deleteAO(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteAo/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting AO:', error);
        return throwError('Error deleting AO');
      })
    );
  }

  getAosByProjetId(projet_id: number): Observable<Ao[]> {
    return this.http.get<Ao[]>(`${this.baseUrl}/aos/${projet_id}`).pipe(
      catchError((error) => {
        console.error('Error fetching AOs by project ID:', error);
        return throwError('Error fetching AOs by project ID');
      })
    );
  }
}