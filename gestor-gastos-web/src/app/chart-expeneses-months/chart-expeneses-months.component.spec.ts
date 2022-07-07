import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartExpenesesMonthsComponent } from './chart-expeneses-months.component';

describe('ChartExpenesesMonthsComponent', () => {
  let component: ChartExpenesesMonthsComponent;
  let fixture: ComponentFixture<ChartExpenesesMonthsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartExpenesesMonthsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartExpenesesMonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
