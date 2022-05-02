import { Contract } from "./contract"

export interface PaymentInfo {
    id: string

    amount: number

    check_number: string

    current_date: Date

    memo: string

    contract: Contract
}

export interface CreatePaymentInfoDto {
    amount: number

    check_number: string

    current_date: Date

    memo: string
}

export interface UpdatePaymentInfoDto extends Partial<CreatePaymentInfoDto> {}
