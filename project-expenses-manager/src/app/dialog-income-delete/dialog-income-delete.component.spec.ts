import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogIncomeDeleteComponent } from './dialog-income-delete.component';

describe('DialogIncomeDeleteComponent', () => {
  let component: DialogIncomeDeleteComponent;
  let fixture: ComponentFixture<DialogIncomeDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogIncomeDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogIncomeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
