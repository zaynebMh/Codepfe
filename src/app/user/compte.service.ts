import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface User {
  username: string;
  email: string;
  password: string;
  role?: number;
}
@Injectable({
  providedIn: 'root'
})
export class CompteService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  getAllComptes(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/Comptes`);
  }

  getCompteById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/Compte/${id}`);
  }

  createCompte(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/createCompte`, user);
  }

  updateCompte(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/updateCompte/${id}`, user);
  }

  deleteCompte(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteCompte/${id}`);
  }
}
