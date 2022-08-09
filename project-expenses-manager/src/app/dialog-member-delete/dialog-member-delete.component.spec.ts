import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMemberDeleteComponent } from './dialog-member-delete.component';

describe('DialogMemberDeleteComponent', () => {
  let component: DialogMemberDeleteComponent;
  let fixture: ComponentFixture<DialogMemberDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMemberDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMemberDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
