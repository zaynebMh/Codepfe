import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Projet } from '../projet.model';
import { ProjetService } from '../projet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projet-add',
  templateUrl: './projet-add.component.html',
  styleUrls: ['./projet-add.component.css']
})
export class ProjetAddComponent implements OnInit {
  projetForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private projetService: ProjetService,
    private router: Router
  ) {
    this.projetForm = this.formBuilder.group({
      intitule: ['', Validators.required],
      etablissement: ['', Validators.required],
      montant: [0, Validators.required],
      ref: [0, Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.projetForm.valid) {
      const projetData: Projet = {
        id: undefined,
        intitule: this.projetForm.get('intitule')?.value,
        etablissement: this.projetForm.get('etablissement')?.value,
        montant: this.projetForm.get('montant')?.value,
        ref: this.projetForm.get('ref')?.value
      };
  
      this.projetService.createProjet(projetData).subscribe(
        (createdProjet: Projet) => {
          console.log('Projet créé avec succès : ', createdProjet);
          // Redirection vers la liste des projets après création
          this.router.navigate(['projet']);
        },
        (error: any) => {
          console.error('Erreur lors de la création du projet : ', error);
          if (error.status === 500) {
            console.error('Erreur interne du serveur. Veuillez vérifier les logs du serveur.');
          } else {
            console.error('Une erreur s\'est produite lors de la création du projet.');
          }
        }
      );
    }
  }
}