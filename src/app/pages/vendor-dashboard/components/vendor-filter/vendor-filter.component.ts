import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {COMMA, ENTER, N} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface workType{
  name: string;
  
}



@Component({
  selector: 'app-vendor-filter',
  templateUrl: './vendor-filter.component.html',
  styleUrls: ['./vendor-filter.component.scss']
})
export class VendorFilterComponent{

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  workTypes: workType[] = [];  

  statuses = new Map(
    [['inContract', false], 
    ['Active', false], 
    ['Inactive', false], 
    ['hasIssues', false]]
    );

  
  constructor() {}


  @Output() newItemEvent = new EventEmitter<string>();

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
    this.workTypes.push({name: value});
    
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
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
      this.statuses.set(name, completed);
      // console.log(name, this.statuses.get(name))
  }

  filterApply(): any{

    const output = [
      this.workTypes,
      this.statuses
    ]


    console.log(output)
    
    return this.workTypes
  }

  filterClear(): void{
    this.workTypes.forEach(element => {
      this.remove(element)
    });

    this.statuses.set('inContract', false)
    this.statuses.set('Active', false)
    this.statuses.set('Inactive', false)
    this.statuses.set('hasIssues', false)

  }



}

