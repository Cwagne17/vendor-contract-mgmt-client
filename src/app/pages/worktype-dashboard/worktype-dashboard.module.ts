import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { WorktypeDashboardComponent } from "./worktype-dashboard.component";

@NgModule({
    declarations: [
        WorktypeDashboardComponent
    ],
    imports: [
      RouterModule.forChild([
          {
            path: '',
            component: WorktypeDashboardComponent
          },
          { path: '**', redirectTo: 'worktype', pathMatch: 'full' }
        ])
    ],
    exports: []
})
export class WorkTypeDashboardModule {}