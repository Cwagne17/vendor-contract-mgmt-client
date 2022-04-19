import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { IVendorService } from './interfaces/ivendor.service';
import * as querystring from 'query-string';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService implements IVendorService {

  private headers = new HttpHeaders(); 

  constructor(private http: HttpClient) { }
  createVendor(createVendorDto: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateVendor(id: string, updateVendorDto: any): Promise<void> {
    throw new Error('Method not implemented.');
  }

  searchVendors(query: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`http://localhost:3000/vendors?${querystring.stringify(query)}`)
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
