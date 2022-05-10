import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ContractFilterComponent } from './components/contract-filter/contract-filter.component';
import { ContractFormComponent } from './components/contract-form/contract-form.component';
import { Contract } from '../../types/contract';
@Component({
  selector: 'app-contract-dashboard',
  templateUrl: './contract-dashboard.component.html',
  styleUrls: ['./contract-dashboard.component.scss']
})
export class ContractDashboardComponent implements OnInit {
  displayedColumns: string[] = ['vendor_name', 'date_range', 'amount_due', 'paid', 'work_id', 'butt'];
  contracts: Contract[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('Called ngOnInit method');
  };

  openFilter() {
    const dialogRef = this.dialog.open(ContractFilterComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    });
  }

  openForm() {
    const dialogRef2 = this.dialog.open(
      ContractFormComponent, { 
      height: '100%',
      width: '50%',
    });
    dialogRef2.updatePosition({ top: '0px', left: `50%`});
    dialogRef2.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    });
  }

}
