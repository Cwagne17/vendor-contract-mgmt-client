import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContractFilterComponent } from './components/contract-filter/contract-filter.component';
import { ContractForm, ContractFormComponent } from './components/contract-form/contract-form.component';
import { Contract, SearchContractsDto } from '../../types/contract';
import { ContractService } from '../../services/contract.service';
@Component({
  selector: 'app-contract-dashboard',
  templateUrl: './contract-dashboard.component.html',
  styleUrls: ['./contract-dashboard.component.scss']
})
export class ContractDashboardComponent implements OnInit {
  displayedColumns: string[] = ['date_range', 'vendor_name', 'amount', 'payments', 'workType'];
  contracts: Contract[] = [];

  query: SearchContractsDto = {
    work_type: [],
    text: ""
  }

  constructor(
    public dialog: MatDialog,
    private readonly contractService: ContractService
  ) {}

  ngOnInit(): void {
    this.searchContracts();
  };

  openFilter() {
    const dialogRef = this.dialog.open(
      ContractFilterComponent,
      {
        data: this.query
      }
    );
    
    dialogRef.afterClosed().subscribe(result => {
      this.query.work_type = result.work_type;

      this.searchContracts();
    });
  }

  openForm(contract?: Contract) {
    const data = contract ? { contract: contract, action: ContractForm.Actions.READ } : { action: ContractForm.Actions.CREATE }; 
    const dialogRef = this.dialog.open(
      ContractFormComponent, { 
      height: '100%',
      width: '50%',
      data: data
    });
    dialogRef.updatePosition({ top: '0px', left: `50%`});
    dialogRef.afterClosed().subscribe(result => {
      this.searchContracts();
    });
  }

  searchContracts() {
    this.contractService.searchContracts(this.query).then((contracts: Contract[]) => {
      this.contracts = contracts;
    });
  }

  changeText(event: any) {
    if (typeof event === "object") {
      this.query.text = event.target.value;
    }
    this.searchContracts();
  }

}
