import { WorkType } from "./work-type"

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

    workType: WorkType
}

export interface CreateVendorDto {
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

export interface UpdateVendorDto {
    vendor_name?: string

    first_name?: string

    last_name?: string

    selection_method?: string

    status?: Vendor.StatusTypes

    contact_phone_number?: string

    contact_email?: string

    memo?: string
}

export interface SearchVendorsDto {
    text?: string
    
    work_type: string[]

    status?: Vendor.StatusTypes[]

    sort?: "ASC" | "DESC" | -1 | 1
}

export namespace Vendor {
    export enum StatusTypes {
        IN_CONTRACT = "in contract",
        ACTIVE = "active",
        INACTIVE = "inactive",
        HAS_ISSUES = "has issues"
    }
}
