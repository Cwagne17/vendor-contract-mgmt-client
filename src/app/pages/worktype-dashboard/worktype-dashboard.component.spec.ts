import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorktypeDashboardComponent } from './worktype-dashboard.component';

describe('WorktypeDashboardComponent', () => {
  let component: WorktypeDashboardComponent;
  let fixture: ComponentFixture<WorktypeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorktypeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorktypeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
