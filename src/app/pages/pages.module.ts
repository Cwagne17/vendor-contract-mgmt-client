import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { VendorDashboardModule } from "./vendor-dashboard/vendor-dashboard.module";
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from "./pages.routing";
import { ContractDashboardModule } from "./contract-dashboard/contract-dashboard.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        PagesComponent,
    ],
    imports: [
        VendorDashboardModule,
        PagesRoutingModule,
        ContractDashboardModule,
        SharedModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class PagesModule {}