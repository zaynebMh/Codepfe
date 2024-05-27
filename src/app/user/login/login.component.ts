import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http'; // Importer HttpErrorResponse

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string | null = null;
  role: number | undefined;

  constructor(private userService: UserService, private router: Router) { }

  submitLogin(): void {
    this.userService.login({
      username: this.username, password: this.password, email: '', role: this.role
    })
      .subscribe(
        (response: any) => {
          if (response && response.username) {
            console.log('role', response.role);
            if (response.role === 1) {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/projet']);
            }
            this.userService.setLoggedIn(true);
            // Stocker les informations de l'utilisateur dans la session locale
            sessionStorage.setItem('currentUser', JSON.stringify(response));
          } else {
            this.error = 'Nom d\'utilisateur ou mot de passe incorrect.';
          }
        },
        (error) => {
          console.error('Erreur lors de la connexion :', error);
          if (error instanceof HttpErrorResponse) {
            // Si l'erreur est une réponse HTTP
            this.error = `Erreur de connexion (${error.status}). Veuillez réessayer.`;
          } else {
            // Si l'erreur est autre chose
            this.error = 'Erreur de connexion. Veuillez réessayer.';
          }
        }
      );
  }
}
