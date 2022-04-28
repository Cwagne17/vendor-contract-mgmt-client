const PhoneRegexp = new RegExp(/\(?\d{3}\)?[\s-]\d{3}[\s-]\d{4}/);


export interface IVendor {
    vendor_name: string,
    work_type: string,
    selection_method: string,
    vendor_phone: string,
    vendor_email: string,
    contact_fname: string,
    contact_lname: string,
    contact_phone: string,
    contact_email: string,
    notes: string,
}

export function validateVendor(vendor: IVendor): boolean {
    let valid=false;
    if (vendor.vendor_name && vendor.vendor_name !== "") {
        valid=true;
    }
    if(vendor.contact_phone && vendor.contact_phone.match(PhoneRegexp)) {
        valid = true;
    }
    return true;
}