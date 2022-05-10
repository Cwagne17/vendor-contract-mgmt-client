import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchContractsDto } from 'src/app/types/contract';
import { ContractFilterComponent } from './components/contract-filter/contract-filter.component';
import { ContractFormComponent } from './components/contract-form/contract-form.component';

@Component({
  selector: 'app-contract-dashboard',
  templateUrl: './contract-dashboard.component.html',
  styleUrls: ['./contract-dashboard.component.scss']
})
export class ContractDashboardComponent implements OnInit {

  query: SearchContractsDto = {
    work_type: []
  }

  constructor(
    @Inject(MatDialog)private dialog : MatDialog
  ) { }

  ngOnInit(): void {
    console.log
  }

  openFilter(): void {
    const dialogRef = this.dialog.open(ContractFilterComponent);
    dialogRef.afterClosed().subscribe((result: SearchContractsDto) => {
      this.query.work_type = result.work_type;
      console.log(`Dialog result: ${this.query.work_type}`)
    });
  }

  openForm(): void {
    // const data = vendor ? { vendor: vendor, action: VendorForm.Actions.READ } : { action: VendorForm.Actions.CREATE }; 
    const dialogRef = this.dialog.open(
      ContractFormComponent, {
        height: '100%',
        width: '50%',
        // data: data
      }
    );
    dialogRef.updatePosition({ top: '0px', left: `50%`});
    dialogRef.afterClosed().subscribe(result => {
      console.log("closed")
    });
  }

}
