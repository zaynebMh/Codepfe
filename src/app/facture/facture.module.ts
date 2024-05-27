import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactureListComponent } from './facture-list/facture-list.component';
import { FactureAddComponent } from './facture-add/facture-add.component';
import { FactureEditComponent } from './facture-edit/facture-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  FactureListComponent,
  FactureAddComponent,
  FactureEditComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ]
})
export class FactureModule { }