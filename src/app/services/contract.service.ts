import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { CONTRACT_ROUTES } from '../../environments/routes';
import { CreateContractDto, SearchContractsDto, Contract, UpdateContractDto } from '../types/contract';
import { AuthService } from './auth.service';
import { IContractService } from './interfaces/icontract.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService implements IContractService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snackbarService: SnackbarService
  ) {}
  
  createContract(vendorId: string, createContractDto: CreateContractDto): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth.initHeaders();
      this.http
      .post(
        CONTRACT_ROUTES.CREATE_CONTRACT(vendorId), 
        createContractDto, {
        headers: this.auth.headers
      })
      .pipe(retry(3))
      .toPromise()
      .then((res: any) => {
        this.snackbarService.sendSuccessNotification("Contract successfully created.");
        resolve(res);
      },
      (error) => {
        this.snackbarService.sendNotificationByError(error);
        reject(error);
      });
    });
  }

  searchContracts(query: SearchContractsDto): Promise<Contract[]> {
    return new Promise((resolve, reject) => {
      this.auth.initHeaders();
      this.http
      .get(
        CONTRACT_ROUTES.SEARCH_CONTRACTS(query), 
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

  updateContract(vendorId: string, id: string, updateContractDto: UpdateContractDto): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth.initHeaders();
      this.http
      .patch(
        CONTRACT_ROUTES.UPDATE_CONTRACT(vendorId, id),
        updateContractDto, 
        { headers: this.auth.headers }
      )
      .pipe(retry(3))
      .toPromise()
      .then((res: any) => {
        this.snackbarService.sendSuccessNotification("Contract successfully updated.");
        resolve(res);
      },
      (error) => {
        this.snackbarService.sendNotificationByError(error);
        reject(error);
      });
    });
  }

  deleteContract(vendorId: string, id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth.initHeaders();
      this.http
      .delete(
        CONTRACT_ROUTES.DELETE_CONTRACT(vendorId, id), 
        { headers: this.auth.headers }
      )
      .pipe(retry(3))
      .toPromise()
      .then((res: any) => {
        this.snackbarService.sendSuccessNotification("Payment Info successfully deleted.");
        resolve(res);
      },
      (error) => {
        this.snackbarService.sendNotificationByError(error);
        reject(error);
      });
    });
  }

  downloadContract(vendorId: string, id: string): void {
    console.log('method not yet implemented');
  }


}
