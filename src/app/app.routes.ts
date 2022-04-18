import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: 'vendor-dashboard',
        loadChildren: () =>
            import('./pages/vendor-dashboard/vendor.module').then((m) => m.VendorModule),
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class VCMSRoutingModule {}