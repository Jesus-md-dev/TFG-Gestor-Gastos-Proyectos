import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSugestionComponent } from './report-sugestion.component';

describe('ReportSugestionComponent', () => {
  let component: ReportSugestionComponent;
  let fixture: ComponentFixture<ReportSugestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportSugestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSugestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
