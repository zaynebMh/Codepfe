import { Component, OnInit } from '@angular/core';
import { Projet } from '../projet.model';
import { ProjetService } from '../projet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projet-list',
  templateUrl: './projet-list.component.html',
  styleUrls: ['./projet-list.component.css']
})
export class ProjetListComponent implements OnInit {


  projets: Projet[] = [];

  constructor(private projetService: ProjetService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjets(); // Charger les projets au chargement du composant
  }

  loadProjets(): void {
    this.projetService.getAllProjets().subscribe(
      (data) => {
        this.projets = data;
        console.log('Liste des projets chargée:', this.projets);
      },
      (error) => {
        console.log('Erreur lors du chargement de la liste des projets:', error);
      }
    );
  }

  createProjet(): void {
    this.router.navigate(['projet/add']);
  }

  editProjet(id: number): void {
    this.router.navigate(['projet/edit', id]);
  }
  viewAos(projet_id:number) {
    this.router.navigate(['aos', projet_id]);
    }

  deleteProjet(id: number): void {
    this.projetService.deleteProjet(id).subscribe(
      () => {
        console.log('Projet supprimé avec succès !');
        // Après la suppression, recharger la liste des projets
        this.loadProjets();
      },
      (error) => {
        console.error('Erreur lors de la suppression du projet :', error);
      }
    );
  }
}
