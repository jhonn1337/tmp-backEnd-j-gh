import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EgcComponent } from './components/egc/egc.component';
import { NewEgcComponent } from './components/new-egc/new-egc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';



@NgModule({
  declarations: [
    EgcComponent,
    NewEgcComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EgcModule { }
