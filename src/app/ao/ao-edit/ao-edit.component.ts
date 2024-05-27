import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ao } from '../ao.model';
import { AoService } from '../ao.service';

@Component({
  selector: 'app-ao-edit',
  templateUrl: './ao-edit.component.html',
  styleUrls: ['./ao-edit.component.css']
})
export class AoEditComponent implements OnInit {
  ao: Ao = {
    id: undefined,
    intitule: '',
    etablissement: '',
    montant: 0,
    ref: 0,
    projet_id: undefined,
    contratIds: [],
    facturesIds: []
  };
  
  aoId: number = 0;

  constructor(
    private aoService: AoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id) && id > 0) {
        this.aoId = id;
        this.fetchAo();
      } else {
        console.error('Identifiant de AO invalide :', id);
      }
    });
  }

  fetchAo(): void {
    if (this.aoId > 0) {
      this.aoService.getAOById(this.aoId).subscribe(
        (ao) => {
          this.ao = ao;
        },
        (error) => {
          console.error('Erreur lors de la récupération de AO :', error);
        }
      );
    } else {
      console.error('Identifiant de AO invalide :', this.aoId);
    }
  }

  updateAo(): void {
    if (this.aoId !== null && this.aoId !== undefined && this.aoId > 0) {
      this.aoService.updateAO(this.ao).subscribe(
        () => {
          console.log('AO mis à jour avec succès');
          this.router.navigate(['aos', this.ao.projet_id]); // Correction ici
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de AO :', error);
        }
      );
    } else {
      console.error('Identifiant de AO invalide :', this.aoId);
    }
  }

  onSubmit(): void {
    if (this.aoId !== null && this.aoId !== undefined && this.aoId > 0) {
      this.updateAo();
    } else {
      console.error('Identifiant de AO invalide :', this.aoId);
    }
  }
}
