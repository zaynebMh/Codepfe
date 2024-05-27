import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';

interface UserDTO {
  username: string;
  email: string;
  password: string;
  role?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl;
  private isLoggedInSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  signup(userDTO: UserDTO): Observable<any> {
    const url = `${this.baseUrl}/signup`;
    return this.http.post<any>(url, userDTO, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  login(userDTO: UserDTO): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<any>(url, userDTO, this.httpOptions)
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.setLoggedIn(true);
          }
        }),
        catchError(this.handleError)
      );
  }

  logout(): Observable<any> {
    const url = `${this.baseUrl}/logout`;
    return this.http.post<any>(url, {}, this.httpOptions)
      .pipe(
        tap(() => {
          this.setLoggedIn(false);
          localStorage.removeItem('accessToken');
        }),
        catchError(this.handleError)
      );
  }

  setLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  private get httpOptions() {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return { headers };
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Une erreur s'est produite : ${error.error.message}`;
    } else {
      errorMessage = `Le serveur a retourné le code ${error.status}, le message d'erreur est : ${error.error}`;
    }
    return throwError(errorMessage);
  }
}
