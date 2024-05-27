import { Component, OnInit } from '@angular/core';
import { Contrat } from '../contrat.model';
import { ContratService } from '../contrat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-contrat-add',
  templateUrl: './contrat-add.component.html',
  styleUrls: ['./contrat-add.component.css']
})
export class ContratAddComponent implements OnInit {
  contratForm!: FormGroup;
  ao_id: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private contratService: ContratService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.contratForm = this.formBuilder.group({
      intitule: ['', Validators.required],
      etablissement: ['', Validators.required],
      montant: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      ref: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.ao_id = +params['ao_id'];
      this.contratForm.patchValue({ ao_id: this.ao_id });
    });
  }

  onSubmit(): void {
    if (this.contratForm.valid && this.ao_id !== undefined) {
      const contratData: Contrat = {
        intitule: this.contratForm.get('intitule')?.value,
        etablissement: this.contratForm.get('etablissement')?.value,
        montant: +this.contratForm.get('montant')?.value,
        ref: this.contratForm.get('ref')?.value,
        id: undefined,
        ao_id: this.ao_id
      };

      this.contratService.createContrat(contratData).subscribe(
        (createdContrat: Contrat) => {
          console.log('Contrat créé avec succès : ', createdContrat);
          // Redirection vers la liste des contrats après création
          this.router.navigate(['contrats/', this.ao_id]);
        },
        (error: any) => {
          console.error('Erreur lors de la création du contrat : ', error);
          if (error.status === 500) {
            console.error('Erreur interne du serveur. Veuillez vérifier les logs du serveur.');
          } else {
            console.error('Une erreur s\'est produite lors de la création du contrat.');
          }
        }
      );
    } else {
      this.markFormGroupTouched(this.contratForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched();
    });
  }
}
