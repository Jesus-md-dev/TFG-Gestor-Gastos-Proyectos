import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogAccountDeleteComponent } from '../dialog-account-delete/dialog-account-delete.component';
import { FileManagerService } from '../file-manager.service';
import { LocalStorageService } from '../local-storage.service';
import { Project } from '../project';
import { User } from '../user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any = new User();
  ownProjects: any = [];
  managedProjects: any = [];
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
    this.formGroup = this.formBuilder.group(
      {
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: [''],
        passwordRepeat: [''],
      },
      {
        validator: this.ConfirmedValidator('password', 'passwordRepeat'),
      }
    );
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
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
          this.formGroup.controls['email'].setValue(this.user.email);
          if (this.owner) {
            this.user.getProjects().then((response: any) => {
              if ('projects_info' in response)
                this.ownProjects = Project.jsontoList(
                  response['projects_info']
                );
            });
            this.user.getProjectsManaged().then((response: any) => {
              if ('projects_info' in response)
                this.managedProjects = Project.jsontoList(
                  response['projects_info']
                );
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
      this.user.email = this.formGroup.controls['email'].value;
      if (this.selectedFile != null) this.user.img = this.selectedFile;
      this.user.update(this.formGroup.controls['password'].value).then((response: any) => {
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
      if (event.target.files[0].size <= 1048576) {
        this.selectedFile = event.target.files[0];
        this.selectedFileName = this.fileManagerService.fixFileName(
          event.target.files[0]['name']
        );
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.selectedFileSrc = reader.result as string;
        };
      } else
        this.snackBar.open('Max file size 1 MiB', 'Close', {
          duration: 3 * 1000,
        });
    }
  }
}
