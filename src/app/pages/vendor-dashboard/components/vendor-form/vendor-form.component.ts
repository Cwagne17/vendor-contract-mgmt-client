import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SNACKBAR_COLOR } from 'src/app/shared/snackbar/snackbar.component';
import { VendorService } from '../../../../services/vendor.service';
import { WorkTypeService } from '../../../../services/work-type.service';
import { CreateVendorDto, UpdateVendorDto, Vendor } from '../../../../types/vendor';

export namespace VendorForm {
  export enum Actions {
    CREATE = "create",
    UPDATE = "update",
    READ = "read"
  }
}

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.scss']
})
export class VendorFormComponent implements OnInit {
  // Form Attributes
  type: string = VendorForm.Actions.READ;
  formTitle: string = "Vendor Details";
  disableInput: boolean = true;

  // Data Attributes
  statuses: Vendor.StatusTypes[] = Object.values(Vendor.StatusTypes);
  selected: any;
  vendor: Vendor = {
    id: '',
    vendor_name: '',
    first_name: '',
    last_name: '',
    selection_method: '',
    status: Vendor.StatusTypes.ACTIVE,
    contact_phone_number: '',
    contact_email: '',
    memo: '',
    workType: {
      id: '',
      type: '',
    }
  };

  constructor(
    private vendorService: VendorService,
    private workTypeService: WorkTypeService,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: { vendor?: Vendor, action: VendorForm.Actions }
  ) {}


  ngOnInit(): void {
    if (this.data.vendor) {
      this.vendor = this.data.vendor;
    }
    
    this.changeForm(this.data.action);
  }

  async vendorAction() {
    switch(this.type){
      case VendorForm.Actions.CREATE:
        const createVendorDto: CreateVendorDto = this.mapVendorToCreateDto();
        await this.vendorService.createVendor(createVendorDto);
        break;
      case VendorForm.Actions.UPDATE:
        this.vendorService.updateVendor(this.vendor.id, {...this.vendor} as UpdateVendorDto);
        break;
    }
  }

  change(event: any, property: string) {
    if (typeof event === "object") {
      switch(property) {
        case 'vendor_name':
          this.vendor.vendor_name = event.target.value;
          break;
        case 'first_name':
          this.vendor.first_name = event.target.value;
          break;
        case 'last_name':
          this.vendor.last_name = event.target.value;
          break;
        case 'selection_method':
          this.vendor.selection_method = event.target.value;
          break;
        case 'status':
          this.vendor.status = event.target.value;
          break;
        case 'contact_phone_number':
          this.vendor.contact_phone_number = event.target.value;
          break;
        case 'contact_email':
          this.vendor.contact_email = event.target.value;
          break;
        case 'memo':
          this.vendor.memo = event.target.value;
          break;
        case 'workType':
          this.vendor.workType.type = event.target.value;
          break;
      }
    }
  }

  changeForm(type: VendorForm.Actions | 'update') {
    this.type = type;
    switch(this.type){
      case VendorForm.Actions.CREATE :
        this.formTitle = "Create Vendor";
        this.disableInput = false;
        break;
      case VendorForm.Actions.UPDATE:
        this.formTitle = "Update Vendor";
        this.disableInput = false;
        break;
      default:
        break;
    }
  }

  mapVendorToCreateDto(): CreateVendorDto {
    return {
      work_id: this.vendor.workType.id,
      ...this.vendor
    } as CreateVendorDto;
  }

}
