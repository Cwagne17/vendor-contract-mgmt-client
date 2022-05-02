import { Component, OnInit} from '@angular/core';
import { VendorService } from '../../services/vendor.service';
import { Vendor } from '../../types/vendor';
import { VendorFilterComponent } from './components/vendor-filter/vendor-filter.component';
import { VendorForm, VendorFormComponent } from './components/vendor-form/vendor-form.component';
import {MatDialog} from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})
export class VendorDashboardComponent implements OnInit {
  vendors: Vendor[] = [];
  displayedColumns: string[] = ['vendor_name', 'contact_phone_number', 'status', 'workType'/*, 'butt'*/];

  constructor(
    private vendorService: VendorService,
    @Inject(MatDialog)private dialog : MatDialog
  ) {}
  
  async ngOnInit(): Promise<void> {
    this.vendorService.searchVendors({}).then((vendors: Vendor[]) => {
      this.vendors = vendors;
      console.log(vendors);
    });
  };

  openFilter() {
    const dialogRef = this.dialog.open(VendorFilterComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    });
  }

  openForm(vendor?: Vendor) {
    console.log(vendor);
    const data = vendor ? { vendor: vendor, action: VendorForm.Actions.READ } : { action: VendorForm.Actions.CREATE }; 

    const dialogRef2 = this.dialog.open(
      VendorFormComponent, {
        height: '100%',
        width: '50%',
        data: data
      }
    );

    dialogRef2.updatePosition({ top: '0px', left: `50%`});
    
    dialogRef2.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    });
  }
  
  openDialog(){
    this.dialog.open(VendorFilterComponent, {
      height : '25vw',
      width : '40vw'
    });
  }

  pullInfo(){
    
  }
  //openFilter(): void {
  //  const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //    width: '250px',
  //    data: {name: this.name, animal: this.animal},
  // };
}
