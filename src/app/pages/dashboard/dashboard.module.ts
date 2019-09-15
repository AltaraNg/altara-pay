import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes,RouterModule } from '@angular/router';
import { MatStepperModule,MatRadioModule, MatSelectModule,MatOptionModule, MatInputModule, MatButtonModule, MatAutocompleteModule } from '@angular/material';
import { IonicModule } from '@ionic/angular';
import { Angular4PaystackModule } from 'angular4-paystack';
import {SharedModule} from '../.././shared.module'
import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    Angular4PaystackModule,
    MatStepperModule, MatInputModule,MatRadioModule, MatButtonModule, MatAutocompleteModule,ReactiveFormsModule,MatSelectModule,MatOptionModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
