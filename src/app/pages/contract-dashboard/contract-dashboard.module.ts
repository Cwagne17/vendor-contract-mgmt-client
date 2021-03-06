import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule} from '@angular/material/table';
import { ContractDashboardComponent } from './contract-dashboard.component';
import { ContractFilterComponent } from './components/contract-filter/contract-filter.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { ContractFormComponent } from './components/contract-form/contract-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from '../../shared/shared.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { PaymentInfoFormComponent } from './components/payment-info-form/payment-info-form.component';
@NgModule({
  declarations: [
    ContractDashboardComponent,
    ContractFilterComponent,
    ContractFormComponent,
    PaymentInfoFormComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatButtonToggleModule,
    MatNativeDateModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContractDashboardComponent
      },
      { path: '**', redirectTo: 'contract', pathMatch: 'full' }
    ])
  ],
  exports: [
    RouterModule
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class ContractDashboardModule { }
