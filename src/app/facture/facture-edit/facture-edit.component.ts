import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Facture } from '../facture.model';
import { FactureService } from '../facture.service';

@Component({
  selector: 'app-facture-edit',
  templateUrl: './facture-edit.component.html',
  styleUrls: ['./facture-edit.component.css']
})
export class FactureEditComponent implements OnInit {
  facture: Facture = {
    intitule: '',
    etablissement: '',
    montant: 0,
    ref: 0,
    id: null,
    contrat_id: undefined
  };
  factureId: number | null = null;
  contratId: number | null = null; // Nouvelle propriété pour stocker l'identifiant du contrat

  constructor(
    private factureService: FactureService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idParam = +params['id'];
      const contratIdParam = +params['contrat_id']; // Récupérer l'identifiant du contrat depuis les paramètres de l'URL
      if (idParam && !isNaN(idParam) && contratIdParam && !isNaN(contratIdParam)) {
        this.factureId = idParam;
        this.contratId = contratIdParam; // Affecter l'identifiant du contrat à la propriété contratId
        this.fetchFacture();
      } else {
        console.error('Identifiant de facture ou de contrat invalide : ', idParam, contratIdParam);
      }
    });
  }

  fetchFacture(): void {
    if (this.factureId && this.contratId) { // Vérifier que les identifiants sont définis
      this.factureService.getFactureById(this.factureId).subscribe(
        (facture: Facture) => {
          this.facture = facture;
        },
        (error) => {
          console.error('Erreur lors de la récupération de la facture:', error);
        }
      );
    } else {
      console.error('Identifiant de facture ou de contrat invalide : ', this.factureId, this.contratId);
    }
  }

  updateFacture(): void {
    if (this.factureId && this.facture && this.contratId) { // Vérifier que les identifiants sont définis
      this.factureService.updateFacture(this.factureId, this.facture).subscribe(
        () => {
          console.log('Facture mise à jour avec succès');
          this.router.navigate(['factures', this.contratId]); // Naviguer vers la page de liste des factures avec l'identifiant du contrat
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la facture:', error);
          // Gérer l'erreur, par exemple afficher un message d'erreur à l'utilisateur
        }
      );
    } else {
      console.error('Identifiant de facture ou de contrat invalide ou facture manquante');
    }
  }

  onSubmit(): void {
    this.updateFacture();
  }
}
