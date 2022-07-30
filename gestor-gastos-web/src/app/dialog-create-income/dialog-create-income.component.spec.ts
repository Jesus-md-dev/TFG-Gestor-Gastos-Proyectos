import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateIncomeComponent } from './dialog-create-income.component';

describe('DialogCreateIncomeComponent', () => {
  let component: DialogCreateIncomeComponent;
  let fixture: ComponentFixture<DialogCreateIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
