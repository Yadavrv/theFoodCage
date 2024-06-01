import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOldOrdersComponent } from './profile-old-orders.component';

describe('ProfileOldOrdersComponent', () => {
  let component: ProfileOldOrdersComponent;
  let fixture: ComponentFixture<ProfileOldOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileOldOrdersComponent]
    });
    fixture = TestBed.createComponent(ProfileOldOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
