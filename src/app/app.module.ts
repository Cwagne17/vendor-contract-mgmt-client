import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VendorDashboardComponent } from './pages/vendor-dashboard/vendor-dashboard.component';
import { VendorFormComponent } from './pages/vendor-dashboard/components/vendor-form/vendor-form.component';
import { VendorFilterComponent } from './pages/vendor-dashboard/components/vendor-filter/vendor-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    VendorDashboardComponent,
    VendorFormComponent,
    VendorFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
