import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAreaUsersComponent } from './admin-area-users.component';

describe('AdminAreaUsersComponent', () => {
  let component: AdminAreaUsersComponent;
  let fixture: ComponentFixture<AdminAreaUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAreaUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAreaUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
