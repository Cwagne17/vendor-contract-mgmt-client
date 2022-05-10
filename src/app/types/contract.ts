import { PaymentInfo } from "./payment-info"
import { Vendor } from "./vendor"
import { WorkType } from "./work-type"

export interface Contract {
    id: string

    amount: number

    contract_date: Date

    contract_end_date: Date

    memo: string

    condition: string

    vendor: Vendor

    workType: WorkType

    paymentInfo: PaymentInfo[]
}

export interface CreateContractDto {
    amount: number

    contract_date: Date

    contract_end_date: Date

    memo?: string

    condition?: string
}

export interface UpdateContractDto extends Partial<CreateContractDto> {}

export interface SearchContractsDto {
    text?: string

    work_type?: string[]

    sort?: "ASC" | "DESC" | -1 | 1
}
