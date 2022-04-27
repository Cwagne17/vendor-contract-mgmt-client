import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HttpErrorResponse } from '@angular/common/http';
import { VendorService } from '../../services/vendor.service';




@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})
export class VendorDashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private vendorService: VendorService) {}

  async ngOnInit(): Promise<void> {
    this.vendorService.searchVendors({}).then((vendors: any) => {
      console.log(vendors);
    });

  };
  //openFilter(): void {
  //  const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //    width: '250px',
  //    data: {name: this.name, animal: this.animal},
  // };
}
