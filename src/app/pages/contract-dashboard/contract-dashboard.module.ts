import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContractDashboardComponent } from './contract-dashboard.component';

@NgModule({
  declarations: [
    ContractDashboardComponent
  ],
  imports: [
    CommonModule,
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
