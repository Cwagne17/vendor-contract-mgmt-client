import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContractDashboardComponent } from './contract-dashboard.component';
import { ContractFilterComponent } from './components/contract-filter/contract-filter.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';






@NgModule({
  declarations: [
    ContractDashboardComponent,
    ContractFilterComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
    MatFormFieldModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContractDashboardComponent
      },
      { path: '**', redirectTo: 'contract', pathMatch: 'full' }
    ])
  ]
})
export class ContractDashboardModule { }
