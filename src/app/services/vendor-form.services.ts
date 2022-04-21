import { Injectable } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Injectable({
    providedIn:'root'
})

export class VendorFormService {

    constructor() { }

    form: FormGroup = new FormGroup({
        $key: new FormControl(null),
        vendorName: new FormControl(''),
        workType: new FormControl(''),
        selectionMethod: new FormControl(''),
        vPhoneNumber: new FormControl(''),
        vEmail: new FormControl(''),
        cFirstName: new FormControl(''),
        cLastName: new FormControl(''),
        cPhoneNumber: new FormControl(''),
        cEmail: new FormControl(''),
        notesMemo: new FormControl('')
      });
}