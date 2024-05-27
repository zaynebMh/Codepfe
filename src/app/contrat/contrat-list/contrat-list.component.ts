import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contrat } from '../contrat.model';
import { ContratService } from '../contrat.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contrat-list',
  templateUrl: './contrat-list.component.html',
  styleUrls: ['./contrat-list.component.css']
})
export class ContratListComponent implements OnInit {

  contrats: Contrat[] = [];
  ao_id?: number;

  constructor(private contratService: ContratService,
     private router: Router,
     private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.ao_id = params['ao_id'];
      if(this.ao_id){
        this.loadContrats(this.ao_id);
      } else {
        console.error('Ao ID is undefined');
      }
    });
  }

  createContrat(): void {
    if (this.ao_id !== undefined) {
      this.router.navigate([`/contrats/${this.ao_id}/add`]);
    } else {
      console.error('ao ID is required to create an contrat');
      // Provide user feedback indicating the need to select a project
      alert('Veuillez sélectionner un ao avant de créer un contrat.');
    }
  }

  editContrat(id?: number): void {
    if (id !== undefined) {
      this.router.navigate([`/contrats/${this.ao_id}/edit`,id]);
    } else {
      console.error('contrat ID is required to edit an contrat');
    }
  }

  deleteContrat(id?: number): void {
    if (id !== undefined) {
      this.contratService.deleteContrat(id).subscribe(
        () => {
          console.log('Contrat supprimé avec succès');
          // Provide user feedback on successful deletion
          alert('Contrat supprimé avec succès.');
          if (this.ao_id !== undefined) {
            this.loadContrats(this.ao_id);
          }
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'AO :', error);
          // Provide user feedback on error
          // You can use a toast, alert, or display error message on the UI
        }
      );
    } else {
      console.error('ID de contrat non défini');
      // Informer l'utilisateur que l'ID du contrat n'est pas défini
      alert('ID de contrat non défini.');
    }
  }

  loadContrats(ao_id: number): void {
    this.contratService.getContratsByAoId(ao_id).subscribe(
      (data)=> {
        this.contrats = data ;
        console.log('Liste des contrats chargée pour le ao', ao_id);
      },
      (error)=>{
        console.error('Erreur lors de la récupération des contrats :',ao_id,':', error);
      }
    );
  }

  navigateToFacturesList(contrat_id: number | undefined) {
    if (contrat_id !== undefined) {
      console.log('Navigating to factures with contrat_id:', contrat_id);
      this.router.navigate(['factures', contrat_id])
        .then(success => console.log('Navigation successful:', success))
        .catch(error => console.error('Navigation error:', error));
    } else {
      console.error('ID de contrat non défini');
      alert('ID de contrat non défini.');
    }
  }
  
}
