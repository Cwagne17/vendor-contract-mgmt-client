import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";

const pages_routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: 'vendor', pathMatch: 'full' },
            {
                path: 'vendor',
                loadChildren:
                    () => import('./vendor-dashboard/vendor-dashboard.module').then(m => m.VendorDashboardModule)
            },
            {
                path: 'contract',
                loadChildren:
                    () => import('./contract-dashboard/contract-dashboard.module').then( m => m.ContractDashboardModule)
            },
            {
                path: 'worktype',
                loadChildren:
                    () => import('./worktype-dashboard/worktype-dashboard.module').then( m => m.WorkTypeDashboardModule)
            },
            { path: '**', redirectTo: 'vendor', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'vendor' }
];

@NgModule({
    imports: [RouterModule.forChild(pages_routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
