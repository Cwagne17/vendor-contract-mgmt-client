import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VendorDashboardComponent } from './pages/vendor-dashboard/vendor-dashboard.component';
import { VendorFormComponent } from './pages/vendor-dashboard/components/vendor-form/vendor-form.component';
import { VendorFilterComponent } from './pages/vendor-dashboard/components/vendor-filter/vendor-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
const routes: Routes = [
  { path: 'vendor-dashboard', component: VendorDashboardComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    VendorDashboardComponent,
    VendorFormComponent,
    VendorFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

