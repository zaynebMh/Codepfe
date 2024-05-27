import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetListComponent } from './projet-list/projet-list.component';
import { ProjetAddComponent } from './projet-add/projet-add.component';
import { ProjetEditComponent } from './projet-edit/projet-edit.component';
import { authGuard } from '../auth.guard';


const routes: Routes = [
  { path: 'projet', component: ProjetListComponent,  canActivate: [authGuard] },
  { path: 'projet/add', component: ProjetAddComponent, canActivate: [authGuard] },
  { path: 'projet/edit/:id', component: ProjetEditComponent,  canActivate: [authGuard] },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetRoutingModule { }
