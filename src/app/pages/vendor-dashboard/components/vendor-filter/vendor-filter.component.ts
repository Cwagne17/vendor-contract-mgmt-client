import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchVendorsDto, Vendor } from 'src/app/types/vendor';
import { VendorDashboardComponent } from '../../vendor-dashboard.component';


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

  constructor(
    private dialogRef: MatDialogRef<VendorFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<SearchVendorsDto>
    ) { }

  
  ngOnInit(): void {
    this.query.work_type = this.data.work_type ? this.data.work_type : [];
    this.query.status = this.data.status ? this.data.status : [];
  }

  inContract() {
    return this.query.status?.includes(Vendor.StatusTypes.IN_CONTRACT);
  }

  hasIssues() {
    return this.query.status?.includes(Vendor.StatusTypes.HAS_ISSUES);
  }

  isActive() {
    return this.query.status?.includes(Vendor.StatusTypes.ACTIVE);
  }

  isInactive() {
    return this.query.status?.includes(Vendor.StatusTypes.INACTIVE);
  }

  add(event: MatChipInputEvent): void {
    if (event.value) {
      this.query.work_type?.push(event.value);
    }
    event.chipInput!.clear();
  }

  remove(type: string): void {
    const index = this.query.work_type?.indexOf(type);
    if (index >= 0) {
      this.query.work_type?.splice(index, 1);
    }
  }

  checBoxChange(checked: boolean, name: string): void{
    if (!checked && this.query.status?.includes(name as Vendor.StatusTypes)) {
      const index = this.query.status!.indexOf(name as Vendor.StatusTypes);
      this.query.status.splice(index, 1);
    } else {
      this.query.status?.push(name as Vendor.StatusTypes);
    }
  }

  filterApply(): void{
    this.query.status = [...new Set(this.query.status)];
    this.dialogRef.close(this.query);    

  }

  filterClear(): void{
    this.query.work_type = [];
    this.query.status = [];
  }
}
