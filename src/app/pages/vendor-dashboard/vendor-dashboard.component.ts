import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { VendorFilterComponent } from './components/vendor-filter/vendor-filter.component';
import { Inject } from '@angular/core';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})
export class VendorDashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, @Inject(MatDialog)private dialogRef : MatDialog) {}

  ngOnInit(): void {
    console.log('Called ngOnInit method');
  }
  
  openDialog(){
    this.dialogRef.open(VendorFilterComponent, {
      height : '25vw',
      width : '40vw'
    });
  }

  pullInfo(){
    
  }
}
