import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectExpensesTableComponent } from './project-expenses-table.component';

describe('ProjectExpensesTableComponent', () => {
  let component: ProjectExpensesTableComponent;
  let fixture: ComponentFixture<ProjectExpensesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectExpensesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectExpensesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
