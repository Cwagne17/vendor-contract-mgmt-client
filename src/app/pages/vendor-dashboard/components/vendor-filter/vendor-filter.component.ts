import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {COMMA, ENTER, N} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WorkType } from '../../../../types/work-type';
import { statusTypes } from '../../../../types/status';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SearchVendorsDto, Vendor } from 'src/app/types/vendor';
import { VendorForm } from '../vendor-form/vendor-form.component';


@Component({
  selector: 'app-vendor-filter',
  templateUrl: './vendor-filter.component.html',
  styleUrls: ['./vendor-filter.component.scss']
})
export class VendorFilterComponent implements OnInit {
  @Output() queryEmitter: EventEmitter<any> = new EventEmitter();

  query: SearchVendorsDto = {
    work_type: [], 
    status: []
  };

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  statusesTest: {name: Vendor.StatusTypes, state: boolean}[] = [
    {name: Vendor.StatusTypes.IN_CONTRACT, state: false}, 
    {name: Vendor.StatusTypes.ACTIVE, state: false},
    {name: Vendor.StatusTypes.INACTIVE, state: false},
    {name: Vendor.StatusTypes.HAS_ISSUES, state: false}
  ];
  constructor(
    private dialogRef: MatDialogRef<VendorFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<SearchVendorsDto>
    ) { }

  
  ngOnInit(): void {
    this.query.work_type = this.data.work_type ? this.data.work_type : [];
    this.query.status = this.data.status ? this.data.status : [];
    for (let i=0; i < this.query.status.length; i++) {
      this.checBoxChange(true, this.query.status[i]);
    }
  }


  add(event: MatChipInputEvent): void {
    // Add new chips
    if (event.value) {
      this.query.work_type?.push(event.value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(type: string): void {
    const index = this.query.work_type?.indexOf(type);

    if (index >= 0) {
      this.query.work_type?.splice(index, 1);
    }
  }

  checBoxChange(completed: boolean, name: string): void{
      for (let i = 0; i < this.statusesTest.length; i++) {
        if (this.statusesTest[i].name == name) {
          this.statusesTest[i].state = completed;
        }
      }
    }

  filterApply(): void{
    this.statusesTest.forEach(element => {
      if (element.state) {
        this.query.status?.push(element.name)
      }
    });

    this.dialogRef.close(this.query);    

  }


  filterClear(): void{
    this.query.work_type = [];

    for (let i = 0; i < this.statusesTest.length; i++) {
      this.statusesTest[i].state = false;
  }
  }



}

