import { Component, Inject, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { VendorService } from '../../../../services/vendor.service';
import { ContractService } from '../../../../services/contract.service';
import { Contract, CreateContractDto, UpdateContractDto } from '../../../../types/contract';
import { PaymentInfo } from '../../../../types/payment-info';
import { Vendor } from '../../../../types/vendor';
import { WorkType } from '../../../../types/work-type';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { PaymentInfoService } from '../../../../services/payment-info.service';
import { PaymentInfoFormComponent } from '../payment-info-form/payment-info-form.component';

export namespace ContractForm {
  export enum Actions {
    CREATE = "create",
    UPDATE = "update",
    READ = "read"
  }
}

export const DATE_FORMAT = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT}
  ]
})
export class ContractFormComponent implements OnInit {
  // Payment form attributes
  displayedColumns: string[] = ["current_date", "check_number", "amount"];

  //Form Attributes
  type: string = ContractForm.Actions.READ;
  formTitle: string = 'Contract Details';
  disableInput: boolean = true;

  contract: Contract = {
    id: '',
    amount: 0,
    contract_date: new Date(),
    contract_end_date: new Date(),
    memo: '',
    condition: '',
    vendor: {
      vendor_name: ''
    } as Vendor,
    workType: {} as WorkType,
    paymentInfo: [] as PaymentInfo[]
  };

  constructor(
    public dialog: MatDialog,
    private readonly contractService: ContractService,
    private readonly vendorService: VendorService,
    private readonly paymentService: PaymentInfoService,
    @Inject(MAT_DIALOG_DATA) public data: {contract?: Contract, action: ContractForm.Actions}
  ) {}

  ngOnInit(): void {
    if (this.data.contract){
      this.contract = this.data.contract;
    }
    this.changeForm(this.data.action);
  }

  openPaymentForm(paymentInfo?: PaymentInfo) {
    const data = paymentInfo ? { 
      paymentInfo: paymentInfo,
      vendorId: this.contract.vendor.id,
      contractId: this.contract.id,
      action: ContractForm.Actions.READ
    } : { 
      vendorId: this.contract.vendor.id,
      contractId: this.contract.id,
      action: ContractForm.Actions.CREATE
    };
     
    const dialogRef = this.dialog.open(
      PaymentInfoFormComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      await this.searchPayments();
    });
  }

  async searchPayments() {
    await this.paymentService.getAllPaymentInfo(this.contract.vendor.id, this.contract.id).then((paymentInfo: PaymentInfo[]) => {
      this.contract.paymentInfo = paymentInfo;
    })
  }

  downloadPdf() {
    this.contractService.downloadContract(this.contract);
  }

  deleteContract() {
    this.contractService.deleteContract(this.contract.vendor.id, this.contract.id);
  }

  async contractAction(){
    switch(this.type){
      case ContractForm.Actions.CREATE:
        await this.contractService.createContract(this.contract.vendor.id, this.mapContractToCreateDto());
        break;
      case ContractForm.Actions.UPDATE:
        await this.contractService.updateContract(this.contract.vendor.id, this.contract.id, this.mapContractToUpdateDto());
        break;
    }
  }

  change(event:any, property: string){
    if(typeof event === "object"){
      switch(property){
        case "amount":
          this.contract.amount = Number(event.target.value);
          break;
        case "contract_date":
          this.contract.contract_date = event.value;
          break;
        case "contract_end_date":
          this.contract.contract_end_date = event.value;
          break;
        case "memo":
          this.contract.memo = event.target.value;
          break;
        case "condition":
          this.contract.condition = event.target.value;
          break;
        case "vendor":
          if (event.target.value !== '') {
            this.vendorService.getVendorByName(event.target.value).then((vendor: Vendor) => {
              this.contract.vendor = vendor;
              this.contract.workType = vendor.workType;
            });
          }
          break;
      }
    }
  }

  changeForm(type: ContractForm.Actions | 'update'){
    this.type = type;
    switch(this.type){
      case ContractForm.Actions.CREATE :
        this.formTitle = "Create Contract";
        this.disableInput = false;
        break;
      case ContractForm.Actions.UPDATE :
        this.formTitle = "Update Contract";
        this.disableInput = false;
        break;
      default:
        break;
    }
  }

  mapContractToCreateDto(): CreateContractDto {
    return {
      amount: this.contract.amount,
      contract_date: this.contract.contract_date,
      contract_end_date: this.contract.contract_end_date,
      condition: this.contract.condition !== '' ? this.contract.condition : undefined,
      memo: this.contract.memo !== '' ? this.contract.memo : undefined 
    }
  }

  mapContractToUpdateDto(): UpdateContractDto {
    return {
      amount: this.contract.amount,
      contract_date: this.contract.contract_date,
      contract_end_date: this.contract.contract_end_date,
      condition: this.contract.condition !== '' ? this.contract.condition : undefined,
      memo: this.contract.memo !== '' ? this.contract.memo : undefined 
    }
  }

}
