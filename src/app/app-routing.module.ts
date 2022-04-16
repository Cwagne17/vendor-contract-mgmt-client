import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorDashboardComponent } from './pages/vendor-dashboard/vendor-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'vendor-dashboard',
    pathMatch: 'full'
},
{
    path: 'vendor-dashboard',
    component: VendorDashboardComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
