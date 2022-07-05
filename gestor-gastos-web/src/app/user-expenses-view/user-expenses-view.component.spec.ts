import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExpensesViewComponent } from './user-expenses-view.component';

describe('UserExpensesViewComponent', () => {
  let component: UserExpensesViewComponent;
  let fixture: ComponentFixture<UserExpensesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserExpensesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserExpensesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
