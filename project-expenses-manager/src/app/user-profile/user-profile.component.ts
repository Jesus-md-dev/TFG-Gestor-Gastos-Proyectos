import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { passwordRegexValidator } from 'custom-validators.directive';
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
  user: User = new User();
  ownProjects: Project[] = [];
  managedProjects: Project[] = [];
  memberProjects: Project[] = [];
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
  passwordMinLength: number = 8;
  firLasNameLenghth: number = 3;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public translate: TranslateService
  ) {
    this.formGroup = this.formBuilder.group(
      {
        first_name: [
          '',
          [Validators.required, Validators.minLength(this.firLasNameLenghth)],
        ],
        last_name: [
          '',
          [Validators.required, Validators.minLength(this.firLasNameLenghth)],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [passwordRegexValidator(this.passwordMinLength)]],
        passwordRepeat: ['', [passwordRegexValidator(this.passwordMinLength)]],
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
        if ('user_info' in response) {
          this.user = User.jsontoObject(response['user_info']);
          this.formGroup.controls['first_name'].setValue(this.user.first_name);
          this.formGroup.controls['last_name'].setValue(this.user.last_name);
          this.formGroup.controls['email'].setValue(this.user.email);
          if (this.owner) {
            this.user.getOwnedProjects().then((response: any) => {
              if ('projects_info' in response)
                this.ownProjects = Project.jsontoList(
                  response['projects_info']
                );
              else if ('message' in response) {
                this.snackBar.open(
                  this.translate.instant(response['message']),
                  this.translate.instant('Close'),
                  {
                    duration: 3 * 1000,
                  }
                );
                this.router.navigate(['/']);
              } else {
                this.snackBar.open(
                  this.translate.instant('system error'),
                  this.translate.instant('Close'),
                  {
                    duration: 3 * 1000,
                  }
                );
                this.router.navigate(['/']);
              }
            });
            this.user.getProjectsManaged().then((response: any) => {
              if ('projects_info' in response)
                this.managedProjects = Project.jsontoList(
                  response['projects_info']
                );
              else if ('message' in response) {
                this.snackBar.open(
                  this.translate.instant(response['message']),
                  this.translate.instant('Close'),
                  {
                    duration: 3 * 1000,
                  }
                );
                this.router.navigate(['/']);
              } else {
                this.snackBar.open(
                  this.translate.instant('system error'),
                  this.translate.instant('Close'),
                  {
                    duration: 3 * 1000,
                  }
                );
                this.router.navigate(['/']);
              }
            });
            this.user.getProjectsMember().then((response: any) => {
              if ('projects_info' in response)
                this.memberProjects = Project.jsontoList(
                  response['projects_info']
                );
              else if ('message' in response) {
                this.snackBar.open(
                  this.translate.instant(response['message']),
                  this.translate.instant('Close'),
                  {
                    duration: 3 * 1000,
                  }
                );
                this.router.navigate(['/']);
              } else {
                this.snackBar.open(
                  this.translate.instant('system error'),
                  this.translate.instant('Close'),
                  {
                    duration: 3 * 1000,
                  }
                );
                this.router.navigate(['/']);
              }
            });
          }
        } else if ('message' in response) {
          this.snackBar.open(
            this.translate.instant(response['message']),
            this.translate.instant('Close'),
            {
              duration: 3 * 1000,
            }
          );
          this.router.navigate(['/']);
        } else {
          this.snackBar.open(this.translate.instant('system error'), this.translate.instant('Close'), {
            duration: 3 * 1000,
          });
          this.router.navigate(['/']);
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
      this.user
        .update(this.formGroup.controls['password'].value)
        .then((response: any) => {
          if ('user_info' in response) {
            this.user = User.jsontoObject(response['user_info']);
            this.snackBar.open(
              this.translate.instant('edit success'),
              this.translate.instant('Close'),
              {
                duration: 3 * 1000,
              }
            );
            this.changeView();
          } else if ('message' in response) {
            this.snackBar.open(
              this.translate.instant(response['message']),
              this.translate.instant('Close'),
              {
                duration: 3 * 1000,
              }
            );
            this.router.navigate(['/']);
          } else {
            this.snackBar.open(
              this.translate.instant('system error'),
              this.translate.instant('Close'),
              {
                duration: 3 * 1000,
              }
            );
            this.router.navigate(['/']);
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
      this.snackBar.open(
        this.translate.instant('Your account has been deleted'),
        this.translate.instant('Close'),
        {
          duration: 3 * 1000,
        }
      );
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
        this.snackBar.open(
          this.translate.instant('Max file size 1 MiB'),
          this.translate.instant('Close'),
          {
            duration: 3 * 1000,
          }
        );
    }
  }
}
