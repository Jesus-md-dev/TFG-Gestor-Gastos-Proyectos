import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FileManagerService } from '../file-manager.service';
import { LocalStorageService } from '../local-storage.service';
import { Project } from '../project';
import { User } from '../user';


@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css'],
})
export class ProjectManagementComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });
  user: User = new User();
  projects: Project[] = [];
  managedProjects: Project[] = [];
  memberProjects: Project[] = [];
  fileManagerService = new FileManagerService();
  localStorageService = new LocalStorageService();
  selectedFile: File | null = null;
  selectedFileSrc: string | null = null;
  selectedFileName: String | null = null;
  expansionPanel: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    public translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let username = this.localStorageService.get('username') ?? undefined;
    if (username != undefined) {
      User.loadUser(username).then((response) => {
        if ('user_info' in response) {
          this.user = User.jsontoObject(response['user_info']);
          this.user.getOwnedProjects().then((response: any) => {
            if ('projects_info' in response)
              this.projects = Project.jsontoList(response['projects_info']);
            else if ('message' in response) {
              this.snackBar.open(
                this.translate.instant(response['message']),
                this.translate.instant('Close'),
                {
                  duration: 3 * 1000,
                }
              );
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
        } else if ('message' in response) {
          this.snackBar.open(
            this.translate.instant(response['message']),
            this.translate.instant('Close'),
            {
              duration: 3 * 1000,
            }
          );
        } else {
          this.snackBar.open(this.translate.instant('system error'), this.translate.instant('Close'), {
            duration: 3 * 1000,
          });
          this.router.navigate(['/']);
        }
      });
    }
  }

  createProject() {
    if (this.formGroup.valid) {
      Project.create(
        this.formGroup.controls['name'].value,
        this.formGroup.controls['category'].value,
        this.selectedFile != null ? this.selectedFile : null
      ).then((response) => {
        if ('project_info' in response) {
          this.snackBar.open(
            this.translate.instant('Project') +
              ' ' +
              response['project_info']['name'] +
              ' ' +
              this.translate.instant('created'),
            this.translate.instant('Close'),
            { duration: 3 * 1000 }
          );
          this.ngOnInit();
          this.formGroup.reset();
          this.resetFile();
          this.expansionPanel = false;
        } else if ('message' in response) {
          this.snackBar.open(
            this.translate.instant(response['message']),
            this.translate.instant('Close'),
            {
              duration: 3 * 1000,
            }
          );
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

  onFileSelected(event: any) {
    const reader = new FileReader();
    if (event.target.files) {
      if (event.target.files[0].size <= 1048576) {
        this.selectedFile = event.target.files[0];
        if (this.selectedFile?.type.split('/')[0] === 'image') {
           this.selectedFileName = this.fileManagerService.fixFileName(
             event.target.files[0]['name']
           );
           const [file] = event.target.files;
           reader.readAsDataURL(file);
           reader.onload = () => {
             this.selectedFileSrc = reader.result as string;
           };
        }
        else {
          this.resetFile();
          this.snackBar.open(
            this.translate.instant('not image'),
            this.translate.instant('Close'),
            {
              duration: 3 * 1000,
            }
          );
        }
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

  resetFile() {
    this.selectedFile = null;
    this.selectedFileSrc = null;
    this.selectedFileName = null;
  }
}
