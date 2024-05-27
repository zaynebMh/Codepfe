import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContratListComponent } from './contrat-list/contrat-list.component';
import { ContratAddComponent } from './contrat-add/contrat-add.component';
import { ContratEditComponent } from './contrat-edit/contrat-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AoModule } from '../ao/ao.module';

@NgModule({
  declarations: [
   ContratListComponent,
    ContratAddComponent,
    ContratEditComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    AoModule
  ]
})
export class ContratModule { }