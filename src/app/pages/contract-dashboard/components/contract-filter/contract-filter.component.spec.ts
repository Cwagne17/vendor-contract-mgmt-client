import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractFilterComponent } from './contract-filter.component';

describe('ContractFilterComponent', () => {
  let component: ContractFilterComponent;
  let fixture: ComponentFixture<ContractFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
