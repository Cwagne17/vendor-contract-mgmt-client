import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { CONTRACT_ROUTES } from '../../environments/routes';
import { CreateContractDto, SearchContractsDto, Contract, UpdateContractDto } from '../types/contract';
import { AuthService } from './auth.service';
import { IContractService } from './interfaces/icontract.service';
import { SnackbarService } from './snackbar.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TableCell, TDocumentDefinitions } from 'pdfmake/interfaces';
import { PaymentInfo } from '../types/payment-info';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


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
    console.log(createContractDto);
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

  downloadContract(contract: Contract): void {
    const tableBody: TableCell[][] = [
      [ // table headers
        { text: 'Date', style: 'tableHdr' },
        { text: 'Check Number', style: 'tableHdr' },
        { text: 'Amount', style: 'tableHdr' }
      ]
    ]
    contract.paymentInfo.forEach( (paymentInfo: PaymentInfo) => {
      tableBody.push([`${paymentInfo.current_date}`, `${paymentInfo.check_number}`, `${paymentInfo.amount}`]);
    });

    const docDefinition: TDocumentDefinitions = {
      content: [
        { columns: [
            { // Vendor Name
              text: `${contract.vendor.vendor_name}`,
              style: ['subtitle']
            },  
            { // Contract Date, Contract End Date
              text: `${contract.contract_date} - ${contract.contract_end_date}`,
              style: ['subtitle']
            }
          ]
        },
        { // contract amount
          text: `Contract Amount: $${contract.amount}`
        },
        { // WorkType
          text: [
            `Work Type: `,
            {
              text: `${contract.workType.type}`,
              style: ['inline']
            }
          ]
        },
        { // Contact Information Section
          stack: [
            {
              text: 'Contact information:',
              style: ['h1', 'marginTop'],
            },
            {
              text: [
                'phone number: ', 
                { 
                  text: `${contract.vendor.contact_phone_number}\n`,
                  style: 'inline'
                },
                'email address: ',
                {
                  text: `${contract.vendor.contact_email}\n`,
                  style: 'inline'
                }
              ],
            },
          ]
        },
        {
          stack: [
            { 
              text: 'Memo:\n',
              style: ['h1', 'marginTop']
            },
            {
              table: { //Contract memo
                headerRows: 0,
                widths: ["*"],
                body: [
                  [
                    { 
                      text: `${contract.memo}`, 
                      style: ['inline', 'textBox']
                    }
                  ]
                ]
              }
            }
          ]
        },
        {
          stack: [ 
            { 
              text: 'Conditions:\n',
              style: ['h1', 'marginTop']
            },
            {
              table: { //Contract condition
                headerRows: 0,
                widths: ["*"],
                body: [
                  [
                    { 
                      text: `${contract.condition}`, 
                      style: ['inline', 'textBox']
                    }
                  ]
                ]
              }
            }
          ]
        },
        {
          stack: [
            {
              text: 'Payment Information:\n',
              style: ['h1', 'marginTop']
            },
            { // Table of payment info
              table: {
                headerRows: 1,
                widths: ["*", "*", "*"],
                body: tableBody
              }
            }
          ]
        }
      ],
      styles: {
        marginTop: {
          margin: [0, 20, 0, 0]
        },
        marginBottom: {
          margin: [0, 0, 0, 20]
        },
        title: {
          fontSize: 22,
          bold: true
        },
        subtitle: {
          fontSize: 20,
          italics: true,
        },
        h1: {
          fontSize: 16
        },
        inline: {
          italics: true
        },
        tableHdr: {
          bold: true
        },
        textBox: {
          margin: 5
        }
      },
      defaultStyle: {
        color: '#222222'
      }
    };
    pdfMake.createPdf(docDefinition).download(`${contract.contract_date}-${contract.vendor.vendor_name}.pdf`);
  }
}
