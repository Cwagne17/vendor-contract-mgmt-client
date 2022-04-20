import { Component, OnInit } from '@angular/core';

export interface Vegetable {
  name: string;
}
@Component({
  selector: 'app-vendor-filter',
  templateUrl: './vendor-filter.component.html',
  styleUrls: ['./vendor-filter.component.scss']
})
export class VendorFilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("yo");
    
  }
}

