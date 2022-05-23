import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateExpenseComponent } from './dialog-create-expense.component';

describe('DialogCreateExpenseComponent', () => {
  let component: DialogCreateExpenseComponent;
  let fixture: ComponentFixture<DialogCreateExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
