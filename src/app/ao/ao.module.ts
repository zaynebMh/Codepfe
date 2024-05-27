import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AoAddComponent } from './ao-add/ao-add.component';
import { AoListComponent } from './ao-list/ao-list.component';
import { AoEditComponent } from './ao-edit/ao-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
AoAddComponent,
AoListComponent,
AoEditComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ]
})
export class AoModule { }