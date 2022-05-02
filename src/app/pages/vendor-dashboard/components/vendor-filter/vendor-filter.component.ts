import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {COMMA, ENTER, N} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormGroup } from '@angular/forms';
import { workType } from 'src/app/types/work-type';
import { statusTypes } from 'src/app/types/status';
import {MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-vendor-filter',
  templateUrl: './vendor-filter.component.html',
  styleUrls: ['./vendor-filter.component.scss']
})
export class VendorFilterComponent{

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  workTypes: workType[] = [];  

  statusesTest: statusTypes[] = [
    {name: 'in contract', state: false}, 
    {name: 'active', state: false},
    {name: 'inactive', state: false},
    {name: 'has issues', state: false}
  ];

  
  ngOnInit(): void {
    console.log('Called ngOnInit method');

  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add new chips
    if (value) {
      this.workTypes.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(type: workType): void {
    const index = this.workTypes.indexOf(type);

    if (index >= 0) {
      this.workTypes.splice(index, 1);
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

    const output = [
      this.workTypes,
      this.statusesTest
    ]
    

    }


  filterClear(): void{
    this.workTypes = [];

    for (let i = 0; i < this.statusesTest.length; i++) {
        this.statusesTest[i].state = false;
    }
  }



}

