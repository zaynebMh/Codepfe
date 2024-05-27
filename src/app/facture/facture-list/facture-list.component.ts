import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Facture } from '../facture.model';
import { FactureService } from '../facture.service';

@Component({
  selector: 'app-facture-list',
  templateUrl: './facture-list.component.html',
  styleUrls: ['./facture-list.component.css']
})
export class FactureListComponent implements OnInit {

  factures: Facture[] = [];
  contrat_id?: number;

  constructor(
    private factureService: FactureService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.contrat_id = +params['contrat_id']; // Convert to number
      if (this.contrat_id) {
        this.loadFactures(this.contrat_id);
      } else {
        console.error('Contrat ID is undefined');
      }
    });
  }

  loadFactures(contrat_id: number): void {
    this.factureService.getFacturesByContratId(contrat_id).subscribe(
      (data) => {
        this.factures = data;
        console.log('Liste des factures chargée pour le contrat', contrat_id, ':', this.factures);
      },
      (error) => {
        console.error('Erreur lors du chargement des factures pour le contrat', contrat_id, ':', error);
      }
    );
  }

  createFacture(): void {
    if (this.contrat_id !== undefined) {
      this.router.navigate([`factures/${this.contrat_id}/add`]);
    } else {
      console.error('Contrat ID is required to create a facture');
      alert('Veuillez sélectionner un contrat avant de créer une facture.');
    }
  }

  editFacture(id?: number): void {
    if (id !== undefined) {
      this.router.navigate([`factures/${this.contrat_id}/edit`, id]);
    } else {
      console.error('Facture ID is required to edit a facture');
    }
  }

  deleteFacture(id?: number): void {
    if (id !== undefined) {
      this.factureService.deleteFacture(id).subscribe(
        () => {
          console.log('Facture deleted successfully');
          if (this.contrat_id !== undefined) {
            this.loadFactures(this.contrat_id);
          }
        },
        (error) => {
          console.error('Error deleting facture:', error);
        }
      );
    } else {
      console.error('Facture ID is required to delete a facture');
    }
  }
}
