import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ContractService } from 'src/app/services/contract.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { WorkTypeService } from 'src/app/services/work-type.service';
import { Contract, CreateContractDto, UpdateContractDto } from 'src/app/types/contract';

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

  //Data Attributes
  statuses: Contract.StatusTypes[] = Object.values(Contract.StatusTypes);
  selected: any;
  contract: Contract = {
    id: '',
    vendor_name: '',
    start_date: '',
    end_date: '',
    amount: 0,
    conditions: '',
    memo: '',
    work_type: {
      id: '',
      type: '',
    }
  };

  constructor(
    private contractService: ContractService,
    private workTypeService: WorkTypeService,
    private snackbarService: SnackbarService,
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
        const createContractDto: CreateContractDto = this.mapContractToCreateDto();
        await this.contractService.createContract(createContractDto);
        break;
      case ContractForm.Actions.UPDATE:
        this.contractService.updateContract(this.contract.id, {...this.contract} as UpdateContractDto);
        break;
    }
  }

  change(event:any, property: string){
    if(typeof event === "object"){
      switch(property){
        case 'vendor_name':
          this.contract.vendor_name = event.target.value;
          break;
        case 'start_date':
          this.contract.start_date = event.target.value;
          break;
        case 'end_date':
          this.contract.end_date = event.target.value;
          break;
        case 'amount':
          this.contract.amount = event.target.value;
          break;
        case 'conditions':
          this.contract.conditions = event.target.value;
          break;
        case 'memo':
          this.contract.memo = event.target.value;
          break;
        case 'work_type':
          this.contract.work_type.type = event.target.value;
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
        this.formTitle = "Update Vendor";
        this.disableInput = false;
        break;
      default:
        break;
    }
  }

  mapContractToCreateDto(): CreateContractDto {
    return {
      work_id: this.contract.workType.id,
      ...this.contract
    } as CreateContractDto;
  }

}
