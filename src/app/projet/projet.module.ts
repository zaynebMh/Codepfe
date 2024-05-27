import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjetListComponent } from './projet-list/projet-list.component';
import { ProjetAddComponent } from './projet-add/projet-add.component';
import { ProjetEditComponent } from './projet-edit/projet-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjetService } from './projet.service';
import { AoListComponent } from '../ao/ao-list/ao-list.component';
import { AoAddComponent } from '../ao/ao-add/ao-add.component';
import { AoEditComponent } from '../ao/ao-edit/ao-edit.component';


@NgModule({
  declarations: [
  ProjetListComponent,
  ProjetAddComponent,
  ProjetEditComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  providers: [ProjetService],
  bootstrap: [ProjetAddComponent,ProjetEditComponent,ProjetListComponent]

})
export class ProjetModule { }