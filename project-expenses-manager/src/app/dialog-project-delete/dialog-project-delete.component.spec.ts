import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProjectDeleteComponent } from './dialog-project-delete.component';

describe('DialogProjectDeleteComponent', () => {
  let component: DialogProjectDeleteComponent;
  let fixture: ComponentFixture<DialogProjectDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProjectDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProjectDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
