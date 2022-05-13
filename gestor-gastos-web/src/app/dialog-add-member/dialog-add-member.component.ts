import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { emptyFieldValidator, existOnListValidator } from 'custom-validators.directive';
import { DialogProjectDeleteComponent } from '../dialog-project-delete/dialog-project-delete.component';
import { Project } from '../project';
import { User } from '../user';

@Component({
  selector: 'app-dialog-add-member',
  templateUrl: './dialog-add-member.component.html',
  styleUrls: ['./dialog-add-member.component.css'],
})
export class DialogAddMemberComponent implements OnInit {
  userlist: string[] = [];
  project: Project;
  projectMembers: User[];
  formGroup: FormGroup = new FormGroup({
    username: new FormControl('', [
      emptyFieldValidator(),
      existOnListValidator(this.userlist),
      //TODO isAlreadyMember
    ]),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogProjectDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.project = data.project;
    this.projectMembers = data.projectMembers;
    console.log(this.projectMembers);
  }

  ngOnInit(): void {}

  onAdd(): void {
    if (this.formGroup.valid) {
      this.userlist.push(this.formGroup.get('username')?.value);
      this.formGroup.reset();
    }
  }

  onDelete(username: string): void {
    this.userlist.splice(this.userlist.indexOf(username), 1);
  }

  onClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close();
  }
}
