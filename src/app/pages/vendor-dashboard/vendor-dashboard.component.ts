import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog} from '@angular/material/dialog';
import { VendorFilterComponent } from './components/vendor-filter/vendor-filter.component';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';




@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})
export class VendorDashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('Called ngOnInit method');
  };
  openDialog() {
    const dialogRef = this.dialog.open(VendorFilterComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    });
  }
  //openFilter(): void {
  //  const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //    width: '250px',
  //    data: {name: this.name, animal: this.animal},
  // };
}
