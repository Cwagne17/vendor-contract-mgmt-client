import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog} from '@angular/material/dialog';
import { VendorFilterComponent } from './components/vendor-filter/vendor-filter.component';
import { VendorFormComponent } from './components/vendor-form/vendor-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTable} from '@angular/material/table';

export interface IVendor {
 vendor_name: string;

/*    first_name: string;

    last_name: string;

    selection_method: string;

    */status?: string;

    contact_phone_number: string;

    //contact_email: string;

    //memo?: string;

    work_id: string;
}




@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})
export class VendorDashboardComponent implements OnInit {
  displayedColumns: string[] = ['vendor_name', 'contact_phone_number', 'status', 'work_id'/*, 'butt'*/];
  vendors: IVendor[] = [
    {vendor_name: '',
    contact_phone_number: '',
    status:'',
    work_id:'' }
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('Called ngOnInit method');
  };

  openFilter() {
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
  }
  //openFilter(): void {
  //  const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //    width: '250px',
  //    data: {name: this.name, animal: this.animal},
  // };
}
