import { Component, OnInit} from '@angular/core';
import { VendorService } from '../../services/vendor.service';
import { SearchVendorsDto, Vendor } from '../../types/vendor';
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
  displayedColumns: string[] = ['vendor_name', 'contact_phone_number', 'status', 'workType'];

  query: SearchVendorsDto = {
    work_type: [],
    text: "",
    status: []
  }

  constructor(
    private vendorService: VendorService,
    @Inject(MatDialog)private dialog : MatDialog
  ) {}
  
  async ngOnInit(): Promise<void> {
    this.searchVendors();
  };

  openFilter() {
    const dialogRef = this.dialog.open(
      VendorFilterComponent,
      {
        data: this.query
      }
    );

    dialogRef.afterClosed().subscribe((result: SearchVendorsDto) => {
      this.query.work_type = result.work_type;
      this.query.status = result.status;

      this.searchVendors();
    });
  }

  openForm(vendor?: Vendor) {
    const data = vendor ? { vendor: vendor, action: VendorForm.Actions.READ } : { action: VendorForm.Actions.CREATE }; 
    const dialogRef = this.dialog.open(
      VendorFormComponent, {
        height: '100%',
        width: '50%',
        data: data
      }
    );
    dialogRef.updatePosition({ top: '0px', left: `50%`});
    dialogRef.afterClosed().subscribe(result => {
      this.searchVendors();
    });
  }

  changeText(event: any) {
    if (typeof event === "object") {
      this.query.text = event.target.value;
    }
    this.searchVendors();
  }

  searchVendors() {
    this.vendorService.searchVendors(this.query).then((vendors: Vendor[]) => {
      this.vendors = vendors;
    });
  }
  
}
