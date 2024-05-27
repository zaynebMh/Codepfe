import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ao } from '../ao.model';
import { AoService } from '../ao.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-ao-add',
  templateUrl: './ao-add.component.html',
  styleUrls: ['./ao-add.component.css']
})
export class AoAddComponent implements OnInit {
  aoForm: FormGroup;
  projet_id: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private aoService: AoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.aoForm = this.formBuilder.group({
      intitule: ['', Validators.required],
      etablissement: ['', Validators.required],
      montant: [0, Validators.min(1)], 
      ref: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.projet_id = +params['projet_id']; // Utiliser 'projet_id' au lieu de 'id'
      // Définir la valeur de projet_id dans le formulaire
      this.aoForm.patchValue({ projet_id: this.projet_id });
    });
  }

  onSubmit(): void {
    if (this.aoForm.valid && this.projet_id !== undefined && this.projet_id > 0) {
      const aoForm: Ao = {
        intitule: this.aoForm.get('intitule')?.value,
        etablissement: this.aoForm.get('etablissement')?.value,
        montant: +this.aoForm.get('montant')?.value,
        ref: this.aoForm.get('ref')?.value,
        contratIds: [],
        facturesIds: [],
        id: undefined,
        projet_id: this.projet_id // Utiliser projet_id récupéré de l'URL
      };

      this.aoService.createAO(aoForm).subscribe(
        (createdAo: Ao) => {
          console.log('AO créé avec succès :', createdAo);
          // Rediriger vers la liste des AO après la création
          this.router.navigate(['/aos', this.projet_id]);
        },
        (error: any) => {
          console.error('Erreur lors de la création de l\'AO :', error);
          if (error.status === 500) {
            console.error('Erreur interne du serveur. Veuillez vérifier les logs du serveur.');
          } else {
            console.error('Une erreur s\'est produite lors de la création de l\'AO.');
          }
        }
      );
    } else {
      console.error('Formulaire invalide ou projet_id non défini.');
      this.markFormGroupTouched(this.aoForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched();
    });
  }
}
