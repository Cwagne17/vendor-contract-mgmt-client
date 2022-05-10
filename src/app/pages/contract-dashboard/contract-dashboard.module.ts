import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContractDashboardComponent } from './contract-dashboard.component';
import { ContractFilterComponent } from './components/contract-filter/contract-filter.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ContractFormComponent } from './components/contract-form/contract-form.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    ContractDashboardComponent,
    ContractFilterComponent,
    ContractFormComponent
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
    MatInputModule,
    MatDatepickerModule,
    MatTableModule,
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
