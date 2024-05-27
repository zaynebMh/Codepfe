import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AoListComponent } from './ao-list/ao-list.component';
import { AoAddComponent } from './ao-add/ao-add.component';
import { AoEditComponent } from './ao-edit/ao-edit.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
  { path: 'aos/:projet_id', component: AoListComponent, canActivate: [authGuard] },
  { path: 'aos/:projet_id/add', component: AoAddComponent , canActivate: [authGuard]},
  { path: 'aos/:projet_id/edit/:id', component: AoEditComponent , canActivate: [authGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AoRoutingModule { }
