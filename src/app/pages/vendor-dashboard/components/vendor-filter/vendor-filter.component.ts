import { Component, OnInit } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-vendor-filter',
  templateUrl: './vendor-filter.component.html',
  styleUrls: ['./vendor-filter.component.scss']
})
export class VendorFilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('Called ngOnInit method');

  }

}
