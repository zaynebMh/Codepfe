import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Facture } from '../facture.model';
import { FactureService } from '../facture.service';

@Component({
  selector: 'app-facture-add',
  templateUrl: './facture-add.component.html',
  styleUrls: ['./facture-add.component.css']
})
export class FactureAddComponent implements OnInit {
  factureForm!: FormGroup;
  contrat_id: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private factureService: FactureService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.factureForm = this.formBuilder.group({
      intitule: ['', Validators.required],
      etablissement: ['', Validators.required],
      montant: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      ref: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      this.contrat_id =+params['contrat_id'];
      this.factureForm.patchValue({contrat_id:this.contrat_id});
    });
    
  }

  onSubmit(): void {
    if (this.factureForm.valid && this.contrat_id !== undefined) {
      const newFacture: Facture = {
        id: undefined,
        intitule: this.factureForm.get('intitule')?.value,
        etablissement: this.factureForm.get('etablissement')?.value,
        montant: this.factureForm.get('montant')?.value,
        ref: this.factureForm.get('ref')?.value,
        contrat_id: this.contrat_id
      };

      // Appel du service pour créer la facture
      this.factureService.createFacture(newFacture).subscribe(
        (createdFacture: Facture) => {
          console.log('Facture créée avec succès : ', createdFacture);
          // Redirection vers la liste des factures après ajout
          this.router.navigate(['factures/', this.contrat_id]);
        },
        (error: any) => {
          console.error('Erreur lors de la création de la facture : ', error);
          if (error.status === 500) {
            console.error('Erreur interne du serveur. Veuillez vérifier les logs du serveur.');
          } else {
            console.error('Une erreur s\'est produite lors de la création du contrat.');
          }
        }
      );
    } else {
      this.markFormGroupTouched(this.factureForm);
    }
  }
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched();
    });
  }
}
