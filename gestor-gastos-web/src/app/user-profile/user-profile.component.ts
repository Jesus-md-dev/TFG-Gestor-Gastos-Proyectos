import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { LocalStorageService } from '../local-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogAccountDeleteComponent } from '../dialog-account-delete/dialog-account-delete.component';
import { FileManagerService } from '../file-manager.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any = new User();
  ownProjects: any = [];
  memberProjects: any = [];
  editView: boolean = false;
  formGroup!: FormGroup;
  username: string | undefined;
  routeSub: any;
  owner: boolean = false;
  selectedFile: File | null = null;
  selectedFileSrc: string | null = null;
  selectedFileName: String | null = null;
  fileManagerService = new FileManagerService();
  localStorageService = new LocalStorageService();

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.formGroup = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.username = params['username'];
      this.owner = this.username == this.localStorageService.get('username');
    });

    if (this.username != undefined) {
      User.loadUser(this.username).then((response) => {
        if ('message' in response) {
          this.snackBar.open(response['message'], 'Close', {
            duration: 3 * 1000,
          });
          this.router.navigate(['/']);
        } else {
          this.user = response;
          this.formGroup.controls['first_name'].setValue(this.user.first_name);
          this.formGroup.controls['last_name'].setValue(this.user.last_name);
          if (this.owner) {
            this.user.getProjects().then((response: any) => {
              this.ownProjects = response;
            });
            this.user.getProjectsMember().then((response: any) => {
              this.memberProjects = response;
            });
          }
        }
      });
    }
  }

  save() {
    if (this.formGroup.valid) {
      this.user.first_name = this.formGroup.controls['first_name'].value;
      this.user.last_name = this.formGroup.controls['last_name'].value;
      if (this.selectedFile != null) this.user.img = this.selectedFile;
      this.user.update().then((response: any) => {
        if ('user_info' in response) {
          this.user = User.jsontoObject(response['user_info']);
          this.snackBar.open('Edit success', 'Close', {
            duration: 3 * 1000,
          });
          this.changeView();
        } else {
          this.snackBar.open('Error', 'Close', { duration: 3 * 1000 });
        }
      });
    }
  }

  deleteAccount() {
    const ref = this.dialog.open(DialogAccountDeleteComponent, {
      data: {
        user: this.user,
      },
    });
    ref.componentInstance.onDeleteEmitter.subscribe((data) => {
      this.snackBar.open('Your account has been deleted', 'Close', {
        duration: 3 * 1000,
      });
      this.router.navigate(['/']);
    });
  }

  changeView() {
    this.editView = !this.editView;
    this.selectedFile = null;
    this.selectedFileName = null;
    this.selectedFileSrc = null;
  }

  onFileSelected(event: any) {
    const reader = new FileReader();
    if (event.target.files) {
      this.selectedFile = event.target.files[0];
      this.selectedFileName = this.fileManagerService.fixFileName(
        event.target.files[0]['name']
      );
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedFileSrc = reader.result as string;
      };
    }
  }
}
