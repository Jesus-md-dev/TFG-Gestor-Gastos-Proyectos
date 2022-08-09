import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseDescriptionComponent } from './expense-description.component';

describe('ExpenseDescriptionComponent', () => {
  let component: ExpenseDescriptionComponent;
  let fixture: ComponentFixture<ExpenseDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
