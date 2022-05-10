import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { VendorService } from 'src/app/services/vendor.service';
import { ContractService } from '../../../../services/contract.service';
import { SnackbarService } from '../../../../services/snackbar.service';
import { WorkTypeService } from '../../../../services/work-type.service';
import { Contract, CreateContractDto, UpdateContractDto } from '../../../../types/contract';
import { PaymentInfo } from '../../../../types/payment-info';
import { Vendor } from '../../../../types/vendor';
import { WorkType } from '../../../../types/work-type';

export namespace ContractForm {
  export enum Actions {
    CREATE = "create",
    UPDATE = "update",
    READ = "read"
  }
}

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss']
})
export class ContractFormComponent implements OnInit {
  //Form Attributes
  type: string = ContractForm.Actions.READ;
  formTitle: string = 'Contract Details';
  disableInput: boolean = true;

  contract: Contract = {
    id: '',
    amount: 0,
    contract_date: new Date(0),
    contract_end_date: new Date(0),
    memo: '',
    condition: '',
    vendor: {
      vendor_name: ''
    } as Vendor,
    workType: {} as WorkType,
    paymentInfo: [] as PaymentInfo[]
  };

  constructor(
    private readonly contractService: ContractService,
    private readonly vendorService: VendorService,
    @Inject(MAT_DIALOG_DATA) public data: {contract?: Contract, action: ContractForm.Actions}
  ) { }

  ngOnInit(): void {
    if (this.data.contract){
      this.contract = this.data.contract;
    }
    this.changeForm(this.data.action)
  }

  async contractAction(){
    switch(this.type){
      case ContractForm.Actions.CREATE:
        // await this.contractService.createContract(this.contract.vendor.id, {...this.contract} as CreateContractDto);
        break;
      case ContractForm.Actions.UPDATE:
        // this.contractService.updateContract(this.contract.vendor.id, this.contract.id, {...this.contract} as UpdateContractDto);
        break;
    }
  }

  change(event:any, property: string){
    if(typeof event === "object"){
      switch(property){
        case "amount":
          this.contract.amount = event.target.value;
          break;
        case "contract_date":
          this.contract.contract_date = event.target.value;
          break;
        case "contract_end_date":
          this.contract.contract_end_date = event.target.value;
          break;
        case "memo":
          this.contract.memo = event.target.value;
          break;
        case "condition":
          this.contract.condition = event.target.value;
          break;
        case "vendor":
          // check if the vendor exists otherwise throw an error
          this.vendorService.getVendorByName(event.target.value);
          // set contract.workType to the vendor's workType
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

}
