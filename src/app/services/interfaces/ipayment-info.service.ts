import { CreatePaymentInfoDto, PaymentInfo, UpdatePaymentInfoDto } from "../../types/payment-info";

export interface IPaymentInfoService {

    /**
     * POST request function to create a new payment in the database
     * 
     * @param vendorId - Request Param vendorId
     * @param contractId - Request Param contractId
     * @param createPaymentDto - Request Body validated by the CreatePaymentDto class
     */
    createPayment(vendorId: string, contractId: string, createPaymentDto: CreatePaymentInfoDto): Promise<void>;

    /**
     * GET request function to get many payment info associated to a given query
     * 
     * @param vendorId - Request Param vendorId
     * @param contractId - Request Param contractId
     */
    getAllPaymentInfo(vendorId: string, contractId: string): Promise<PaymentInfo[]>;

    /**
     * PATCH request function to update an existing payment info in the database
     * 
     * @param vendorId - Request Param vendorId
     * @param contractId - Request Param contractId
     * @param id - Request Param paymentId
     * @param updatePaymentDto - Request Body validated by the UpdatePaymentDto
     */
    updatePayment(vendorId: string, contractId: string, id: string, updatePaymentDto: UpdatePaymentInfoDto): Promise<void>;

    /**
     * DELETE request function to delete an existing payment info in the database
     * 
     * @param vendorId - Request Param vendorId
     * @param contractId - Request Param contractId
     * @param id - Request Param paymentId
     */
    deletePayment(vendorId: string, contractId: string, id: string): Promise<void>;

}