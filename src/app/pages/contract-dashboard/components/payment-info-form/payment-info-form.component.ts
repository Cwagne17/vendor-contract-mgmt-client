import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentInfoService } from 'src/app/services/payment-info.service';
import { Contract } from 'src/app/types/contract';
import { PaymentInfo } from 'src/app/types/payment-info';

export namespace PaymentInfoForm {
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
  selector: 'app-payment-info-form',
  templateUrl: './payment-info-form.component.html',
  styleUrls: ['./payment-info-form.component.scss']
})
export class PaymentInfoFormComponent implements OnInit {
  formTitle: string = "Payment Details";
  type: string = '';
  disableInput: boolean = true;

  contractId: string = '';
  vendorId: string = '';
  paymentInfo: PaymentInfo = {
    id: '',
    amount: 0,
    current_date: new Date(),
    memo: '',
    check_number: '',
    contract: {} as Contract
  };

  constructor(
    private readonly paymentService: PaymentInfoService,
    @Inject(MAT_DIALOG_DATA) public data: {
      paymentInfo?: PaymentInfo,
      vendorId?: string,
      contractId?: string,
      action: PaymentInfoForm.Actions
    }
  ) {}

  ngOnInit(): void {
    if (this.data.paymentInfo) {
      this.paymentInfo = this.data.paymentInfo;
    }
    if (this.data.contractId) {
      this.contractId = this.data.contractId;
    }
    if (this.data.vendorId) {
      this.vendorId = this.data.vendorId;
    }
    this.changeForm(this.data.action);
  }

  changeForm(type: string): void{
    this.type = type;
    switch(this.type){
      case PaymentInfoForm.Actions.CREATE :
        this.formTitle = "Add Payment";
        this.disableInput = false;
        break;
      case PaymentInfoForm.Actions.UPDATE :
        this.formTitle = "Update Payment";
        this.disableInput = false;
        break;
      default:
        break;
    }
  }

  async paymentAction() {
    switch (this.type) {
      case PaymentInfoForm.Actions.CREATE:
        await this.paymentService.createPayment(
          this.vendorId,
          this.contractId,
          {...this.paymentInfo}
        );
        break;
      case PaymentInfoForm.Actions.UPDATE:
        await this.paymentService.updatePayment(
          this.vendorId,
          this.contractId,
          this.paymentInfo.id,
          {...this.paymentInfo}
        );
        break;
    }
  }

  async deletePayment() {
    await this.paymentService.deletePayment(
      this.vendorId,
      this.contractId,
      this.paymentInfo.id
    );
  }

  change(event: any, property: string) {
    if(typeof event === "object") {
      switch(property) {
        case "check_number":
          this.paymentInfo.check_number = event.target.value;
          break;
        case "amount":
          this.paymentInfo.amount = Number(event.target.value);
          break;
        case "current_date":
          this.paymentInfo.current_date = event.value;
          break;
        case "memo":
          this.paymentInfo.memo = event.target.value;
          break;
      }
    }
  }

}
