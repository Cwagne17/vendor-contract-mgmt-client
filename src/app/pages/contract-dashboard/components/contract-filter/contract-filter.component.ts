import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { WorkType } from '../../../../types/work-type';

import {COMMA, ENTER, N} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { SearchContractsDto } from 'src/app/types/contract';


@Component({
  selector: 'app-contract-filter',
  templateUrl: './contract-filter.component.html',
  styleUrls: ['./contract-filter.component.scss']
})
export class ContractFilterComponent implements OnInit {
  @Output() queryEmitter: EventEmitter<any> = new EventEmitter();


  query: SearchContractsDto = {
    work_type: []

  };
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;


  constructor(private dialogRef: MatDialogRef<ContractFilterComponent>) { }

  ngOnInit(): void {
    console.log;
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

    if (index && index >= 0) {
      this.query.work_type?.splice(index, 1);
    }
  }
  filterClear(): void{
    this.query.work_type = [];
  }

  filterApply(): void{
    this.dialogRef.close(this.query);    
  }

}
