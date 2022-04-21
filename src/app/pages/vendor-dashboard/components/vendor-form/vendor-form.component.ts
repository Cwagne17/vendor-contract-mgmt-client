import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VendorFormService } from 'src/app/services/vendor-form.services';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.scss']
})
export class VendorFormComponent implements OnInit {

  constructor(private service: VendorFormService) { }

  ngOnInit(): void {
  }

}

