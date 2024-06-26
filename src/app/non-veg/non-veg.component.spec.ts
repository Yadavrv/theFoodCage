import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonVegComponent } from './non-veg.component';

describe('NonVegComponent', () => {
  let component: NonVegComponent;
  let fixture: ComponentFixture<NonVegComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NonVegComponent]
    });
    fixture = TestBed.createComponent(NonVegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
