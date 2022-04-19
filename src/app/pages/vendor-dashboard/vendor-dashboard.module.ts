import { NgModule } from '@angular/core';
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
    RouterModule.forChild([
      {
        path: '',
        component: VendorDashboardComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class VendorDashboardModule { }
