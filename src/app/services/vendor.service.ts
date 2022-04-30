import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { IVendorService } from './interfaces/ivendor.service';
import * as querystring from 'query-string';
import { retry } from 'rxjs';
import { VENDOR_ROUTES } from '../../environments/routes';
import {CreateVendorDto, SearchVendorsDto, UpdateVendorDto, Vendor} from '../types/vendor';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class VendorService implements IVendorService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snackbarService: SnackbarService
  ) {}

  createVendor(createVendorDto: CreateVendorDto): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
      .post(
        VENDOR_ROUTES.CREATE_VENDOR(), 
        createVendorDto, {
        headers: this.auth.headers
      })
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

  updateVendor(id: string, updateVendorDto: UpdateVendorDto): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
      .patch(
        VENDOR_ROUTES.UPDATE_VENDOR(id), 
        updateVendorDto, {
        headers: this.auth.headers
      })
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

  searchVendors(query: SearchVendorsDto): Promise<Vendor[]> {
    return new Promise((resolve, reject) => {
      this.auth.initHeaders();
      this.http
        .get(
          VENDOR_ROUTES.SEARCH_VENDORS(query), { 
          headers: this.auth.headers 
        })
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
