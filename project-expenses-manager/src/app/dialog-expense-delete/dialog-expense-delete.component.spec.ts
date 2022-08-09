import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExpenseDeleteComponent } from './dialog-expense-delete.component';

describe('DialogExpenseDeleteComponent', () => {
  let component: DialogExpenseDeleteComponent;
  let fixture: ComponentFixture<DialogExpenseDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExpenseDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExpenseDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
