import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorDashboardComponent } from './vendor-dashboard.component';
import { VendorFilterComponent } from './components/vendor-filter/vendor-filter.component';
import { VendorFormComponent } from './components/vendor-form/vendor-form.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VendorFormService } from 'src/app/services/vendor-form.services';

@NgModule({
  declarations: [
    VendorDashboardComponent,
    VendorFilterComponent,
    VendorFormComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild([
      {
        path: '',
        component: VendorDashboardComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [VendorFormService],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class VendorDashboardModule { }
