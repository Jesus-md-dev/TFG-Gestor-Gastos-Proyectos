import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeDescriptionComponent } from './income-description.component';

describe('IncomeDescriptionComponent', () => {
  let component: IncomeDescriptionComponent;
  let fixture: ComponentFixture<IncomeDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
