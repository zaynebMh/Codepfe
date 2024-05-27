import { Component, OnInit } from '@angular/core';
import { AoService } from '../ao.service';
import { Ao } from '../ao.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ao-list',
  templateUrl: './ao-list.component.html',
  styleUrls: ['./ao-list.component.css']
})
export class AoListComponent implements OnInit {
  aos: Ao[] = [];
  projet_id?: number;

  constructor(
    private aoService: AoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Obtenir l'ID du projet à partir des paramètres de la route
    this.route.params.subscribe(params => {
      this.projet_id = +params['projet_id']; // + pour convertir en nombre
      if (this.projet_id) {
        this.loadAos(this.projet_id);
      } else {
        console.error('Projet ID is undefined'); // This is where the error originates
      }
    });
  }

  loadAos(projet_id: number): void {
    this.aoService.getAosByProjetId(projet_id).subscribe(
      (data) => {
        this.aos = data;
        console.log('Liste des AOs chargée pour le projet', projet_id, ':', this.aos);
      },
      (error) => {
        console.error('Erreur lors du chargement des AOs pour le projet', projet_id, ':', error);
        // Provide user feedback on error
        // You can use a toast, alert, or display error message on the UI
      }
    );
  }

  createAo(): void {
    if (this.projet_id !== undefined) {
      this.router.navigate([`/aos/${this.projet_id}/add`]);
    } else {
      console.error('Projet ID is required to create an AO');
      // Provide user feedback indicating the need to select a project
      alert('Veuillez sélectionner un projet avant de créer un AO.');
    }
  }

  editAo(id?: number): void {
    if (id !== undefined) {
      this.router.navigate([`/aos/${this.projet_id}/edit`,id]);
    } else {
      console.error('AO ID is required to edit an AO');
    }
  }

  deleteAo(id?: number): void {
    if (id !== undefined) {
      this.aoService.deleteAO(id).subscribe(
        () => {
          console.log('AO supprimé avec succès');
          if (this.projet_id !== undefined) {
            this.loadAos(this.projet_id);
          }
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'AO :', error);
          // Provide user feedback on error
          // You can use a toast, alert, or display error message on the UI
        }
      );
    } else {
      console.error('AO ID is required to delete an AO');
    }
  }
  viewContrats(ao_id:number) {
    this.router.navigate(['contrats', ao_id]);
    }
}
