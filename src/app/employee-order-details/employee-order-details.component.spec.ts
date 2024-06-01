import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOrderDetailsComponent } from './employee-order-details.component';

describe('EmployeeOrderDetailsComponent', () => {
  let component: EmployeeOrderDetailsComponent;
  let fixture: ComponentFixture<EmployeeOrderDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeOrderDetailsComponent]
    });
    fixture = TestBed.createComponent(EmployeeOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
