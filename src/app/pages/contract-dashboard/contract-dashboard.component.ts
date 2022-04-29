import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog} from '@angular/material/dialog';

import {MatDialogModule} from '@angular/material/dialog';
import {MatTable} from '@angular/material/table';

export interface IContract {
  vendor_name: string;

 /*    first_name: string;

     last_name: string;

     selection_method: string;
*/
     date_range: string;

     amount_due: string;

     //contact_email: string;

     paid?: string;

     work_id: string;
 }

@Component({
  selector: 'app-contract-dashboard',
  templateUrl: './contract-dashboard.component.html',
  styleUrls: ['./contract-dashboard.component.scss']
})
export class ContractDashboardComponent implements OnInit {
displayedColumns: string[] = ['vendor_name', 'date_range', 'amount_due', 'paid', 'work_id', 'butt'];
  contracts: IContract[] = [
    {vendor_name: '',
    date_range: '',
    amount_due:'',
    work_id:'',
  paid:'' }
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('Called ngOnInit method');
  };

  /*openFilter() {
    const dialogRef = this.dialog.open(VendorFilterComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    });
  }

  openForm() {
    const dialogRef2 = this.dialog.open(VendorFormComponent, {
      height: '100%',
      width: '50%',
    });
    dialogRef2.updatePosition({ top: '0px', left: `50%`});
    //dialogRef2.updatePosition()
    dialogRef2.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    });
  }*/

}
