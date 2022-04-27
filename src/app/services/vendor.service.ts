import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { IVendorService } from './interfaces/ivendor.service';
import * as querystring from 'query-string';
import { retry } from 'rxjs';
import { VENDOR_ROUTES } from '../../environments/routes';
import {CreateVendorDto, SearchVendorsDto, UpdateVendorDto, Vendor} from '../types/vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService implements IVendorService {

  constructor(private http: HttpClient) { }

  createVendor(createVendorDto: CreateVendorDto): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
      .post(
      VENDOR_ROUTES.CREATE_VENDOR(), createVendorDto)
      .pipe(retry(3))
      .toPromise()
      .then((res: any) => {
        resolve(res);
      },
      (error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  updateVendor(id: string, updateVendorDto: UpdateVendorDto): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
      .patch(
      VENDOR_ROUTES.UPDATE_VENDOR(id), updateVendorDto)
      .pipe(retry(3))
      .toPromise()
      .then((res: any) => {
        resolve(res);
      },
      (error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  searchVendors(query: SearchVendorsDto): Promise<Vendor[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get(VENDOR_ROUTES.SEARCH_VENDORS(query))
        .pipe(retry(3))
        .toPromise()
        .then((res: any) => {
          resolve(res);
        },
        (error) => {
          console.log(error);
          reject(error);
        });
    });
  }
}
