import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDashboardComponent } from './contract-dashboard.component';

describe('ContractDashboardComponent', () => {
  let component: ContractDashboardComponent;
  let fixture: ComponentFixture<ContractDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
