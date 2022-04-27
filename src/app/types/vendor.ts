export interface Vendor {
    id: string

    vendor_name: string

    first_name: string
    
    last_name: string
    
    selection_method: string
    
    status?: Vendor.StatusTypes

    contact_phone_number: string

    contact_email: string

    memo?: string

    work_id: string
}

export interface CreateVendorDto {

}

export interface UpdateVendorDto {

}

export interface SearchVendorsDto {

}

export namespace Vendor {
    export enum StatusTypes {
        IN_CONTRACT = "in contract",
        ACTIVE = "active",
        INACTIVE = "inactive",
        HAS_ISSUES = "has issues"
    }
}