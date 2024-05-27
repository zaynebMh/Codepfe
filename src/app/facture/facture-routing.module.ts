import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FactureListComponent } from './facture-list/facture-list.component';
import { FactureAddComponent } from './facture-add/facture-add.component';
import { FactureEditComponent } from './facture-edit/facture-edit.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
  { path: 'factures/:contrat_id', component: FactureListComponent ,  canActivate: [authGuard]},
  { path: 'factures/:contrat_id/add', component: FactureAddComponent ,  canActivate: [authGuard]},
  { path: 'factures/:contrat_id/edit/:id', component: FactureEditComponent ,  canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactureRoutingModule { }
