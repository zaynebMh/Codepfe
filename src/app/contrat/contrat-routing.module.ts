import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContratListComponent } from './contrat-list/contrat-list.component';
import { ContratAddComponent } from './contrat-add/contrat-add.component';
import { ContratEditComponent } from './contrat-edit/contrat-edit.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
  { path: 'contrats/:ao_id', component: ContratListComponent , canActivate: [authGuard]},
  { path: 'contrats/:ao_id/add', component: ContratAddComponent,  canActivate: [authGuard] },
  { path: 'contrats/:ao_id/edit/:id', component: ContratEditComponent ,  canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
