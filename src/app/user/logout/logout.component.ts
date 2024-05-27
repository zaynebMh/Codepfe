import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private userService: UserService, private router: Router) { }

  logout(): void {
    // Appel à la méthode logout du service UserService
    this.userService.logout().subscribe({
      next: () => {
        // Déconnexion réussie
        // Supprimer les informations de session côté client
        localStorage.removeItem('accessToken');
        // Rediriger l'utilisateur vers la page de connexion
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion :', error);
        // Gérer l'erreur ici, par exemple afficher un message d'erreur à l'utilisateur
      }
    });
  }
}
