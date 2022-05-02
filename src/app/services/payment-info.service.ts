import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { PAYMENT_ROUTES } from '../../environments/routes';
import { CreatePaymentInfoDto, PaymentInfo, UpdatePaymentInfoDto } from '../types/payment-info';
import { AuthService } from './auth.service';
import { IPaymentInfoService } from './interfaces/ipayment-info.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentInfoService implements IPaymentInfoService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snackbarService: SnackbarService
  ) {}

  createPayment(vendorId: string, contractId: string, createPaymentDto: CreatePaymentInfoDto): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth.initHeaders();
      this.http
      .post(
        PAYMENT_ROUTES.CREATE_PAYMENT(vendorId, contractId), 
        createPaymentDto, 
        { headers: this.auth.headers }
      )
      .pipe(retry(3))
      .toPromise()
      .then((res: any) => {
        resolve(res);
      },
      (error) => {
        this.snackbarService.sendNotificationByError(error);
        reject(error);
      });
    });
  }

  getAllPaymentInfo(vendorId: string, contractId: string): Promise<PaymentInfo[]> {
    return new Promise((resolve, reject) => {
      this.auth.initHeaders();
      this.http
      .get(
        PAYMENT_ROUTES.GET_ALL_PAYMENT_INFO(vendorId, contractId), 
        { headers: this.auth.headers }
      )
      .pipe(retry(3))
      .toPromise()
      .then((res: any) => {
        resolve(res);
      },
      (error) => {
        this.snackbarService.sendNotificationByError(error);
        reject(error);
      });
    });
  }
  updatePayment(vendorId: string, contractId: string, id: string, updatePaymentDto: UpdatePaymentInfoDto): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth.initHeaders();
      this.http
      .patch(
        PAYMENT_ROUTES.UPDATE_PAYMENT(vendorId, contractId, id), 
        updatePaymentDto,
        { headers: this.auth.headers }
      )
      .pipe(retry(3))
      .toPromise()
      .then((res: any) => {
        resolve(res);
      },
      (error) => {
        this.snackbarService.sendNotificationByError(error);
        reject(error);
      });
    });
  }

  deletePayment(vendorId: string, contractId: string, id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth.initHeaders();
      this.http
      .delete(
        PAYMENT_ROUTES.DELETE_PAYMENT(vendorId, contractId, id), 
        { headers: this.auth.headers }
      )
      .pipe(retry(3))
      .toPromise()
      .then((res: any) => {
        resolve(res);
      },
      (error) => {
        this.snackbarService.sendNotificationByError(error);
        reject(error);
      });
    });
  }

}
