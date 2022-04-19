import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: 'dashboard', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
    { path: '', redirectTo: 'dashboard/vendor', pathMatch: 'full' },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}