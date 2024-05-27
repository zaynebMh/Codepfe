import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Projet } from '../projet.model';
import { ProjetService } from '../projet.service';


@Component({
  selector: 'app-projet-edit',
  templateUrl: './projet-edit.component.html',
  styleUrls: ['./projet-edit.component.css']
})
export class ProjetEditComponent implements OnInit {
  projet: Projet = {
   intitule: '',
  etablissement: '',
  montant: 0,
  ref: 0, 
  id: 0 };
  projetId: number =0;

  constructor(
    private projetService: ProjetService,
    private route: ActivatedRoute,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idParam = +params['id'];
      if (!isNaN(idParam) && idParam > 0) {
        this.projetId = idParam;
        this.fetchProjet();
      } else {
        console.error('Identifiant de projet invalide : ', this.projetId);
      }
    });
  }

  fetchProjet(): void {
    if(this.projetId){
    this.projetService.getProjetById(this.projetId).subscribe(
      (projet: Projet) => {
        this.projet = projet;
      },
      (error) => {
        console.error('Error fetching projet:', error);
      }
    );
  }console.error('Identifiant de projet invalid :', this.projetId)
}

  updateProjet(): void {
    if(this.projetId && this.projet){
    this.projetService.updateProjet(this.projetId, this.projet).subscribe(
      () => {
        console.log('Projet mis à jour avec succès');
        this.router.navigate(['/projet']);
      },
      (error) => {
        console.error('Error updating projet:', error);
      }
    );
  }else{
    console.error('Identifiant de projet invalide ou projet manquante')
  }
}


  onSubmit(): void {
    this.updateProjet();
  }
}
