import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogProjectDeleteComponent } from '../dialog-project-delete/dialog-project-delete.component';

@Component({
  selector: 'app-dialog-add-member',
  templateUrl: './dialog-add-member.component.html',
  styleUrls: ['./dialog-add-member.component.css']
})
export class DialogAddMemberComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogProjectDeleteComponent>) {}

  ngOnInit(): void {
  }

  onClick(): void {
    this.dialogRef.close()
  }

}
