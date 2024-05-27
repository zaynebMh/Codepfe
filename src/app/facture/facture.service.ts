import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Facture } from './facture.model'; 
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllFactures(): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.baseUrl}/factures`).pipe(
      catchError(this.handleError)
    );
  }

  createFacture(facture: Facture): Observable<Facture> {
    return this.http.post<Facture>(`${this.baseUrl}/createFacture`, facture).pipe(
      catchError(this.handleError)
    );
  }

  getFactureById(id: number): Observable<Facture> {
    return this.http.get<Facture>(`${this.baseUrl}/facture/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateFacture(factureId: number, updatedFactureData: Partial<Facture>): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateFacture/${factureId}`, updatedFactureData).pipe(
      catchError(this.handleError)
    );
  }

  deleteFacture(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteFacture/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getFacturesByContratId(contratId: number): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.baseUrl}/factures/${contratId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
