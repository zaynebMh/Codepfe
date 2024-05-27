import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contrat } from '../contrat.model';
import { ContratService } from '../contrat.service';

@Component({
  selector: 'app-contrat-edit',
  templateUrl: './contrat-edit.component.html',
  styleUrls: ['./contrat-edit.component.css']
})
export class ContratEditComponent implements OnInit {
  contrat: Contrat = {
    id: undefined,
    intitule: '',
    etablissement: '',
    montant: 0,
    ref: 0,
    ao_id: undefined
  };
  contratId: number = 0;

  constructor(
    private contratService: ContratService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id) && id > 0) {
        this.contratId = +id;
        this.fetchContrat();
      } else {
        console.error('Identifiant de contrat invalide : ', id);
      }
    });
  }

  fetchContrat(): void {
    if (this.contratId > 0) {
      this.contratService.getContratById(this.contratId).subscribe(
        (contrat) => {
          this.contrat = contrat;
        },
        (error) => {
          console.error('Erreur lors de la récupération du contrat :', error);
        }
      );
    } else {
      console.error('Identifiant de contrat invalide :', this.contratId);
    }
  }

  updateContrat(): void {
    if (this.contratId && this.contrat.ao_id !== undefined && this.contrat.ao_id !== null) {
      const aoId = this.contrat.ao_id; // Récupérer la valeur de ao_id
      const contratId = this.contratId; // Récupérer la valeur de l'ID du contrat
  
      // Naviguer vers la route de mise à jour du contrat en utilisant les valeurs récupérées
      this.router.navigate(['/contrats', aoId, 'edit', contratId]).then(
        () => console.log('Navigué avec succès vers la mise à jour du contrat'),
        (error) => console.error('Erreur lors de la navigation vers la mise à jour du contrat :', error)
      );
    } else {
      console.error('Identifiant de contrat ou ao_id invalide : ', this.contratId, this.contrat.ao_id);
    }
  }
  

  onSubmit(): void {
    if (this.contratId && this.contrat.ao_id !== undefined) {
      this.updateContrat();
    } else {
      console.error('Identifiant de contrat ou ao_id invalide : ', this.contratId, this.contrat.ao_id);
    }
  }
}
