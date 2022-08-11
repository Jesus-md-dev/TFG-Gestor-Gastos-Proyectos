import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLeaveProjectComponent } from './dialog-leave-project.component';

describe('DialogLeaveProjectComponent', () => {
  let component: DialogLeaveProjectComponent;
  let fixture: ComponentFixture<DialogLeaveProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLeaveProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLeaveProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
