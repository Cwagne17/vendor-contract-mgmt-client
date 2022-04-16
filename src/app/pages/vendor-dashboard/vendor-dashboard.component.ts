import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})
export class VendorDashboardComponent implements OnInit {
  options!: FormGroup;
  constructor(fb: FormBuilder, private route: ActivatedRoute) {
    this.options = fb.group({
      bottom: 0,
      fixed: true,
      top: 0,
    });
   }

  ngOnInit(): void {
    console.log('Called ngOnInit method');
  }

}
