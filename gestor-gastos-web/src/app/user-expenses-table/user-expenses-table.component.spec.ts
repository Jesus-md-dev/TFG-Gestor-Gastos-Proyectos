import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExpensesTableComponent } from './user-expenses-table.component';

describe('UserExpensesTableComponent', () => {
  let component: UserExpensesTableComponent;
  let fixture: ComponentFixture<UserExpensesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserExpensesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserExpensesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
