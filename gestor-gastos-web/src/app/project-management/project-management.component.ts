import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  user: any = new User();
  projects: any = [];
  fileManagerService = new FileManagerService();
  localStorageService = new LocalStorageService();
  selectedFile: File | null = null;
  selectedFileSrc: string | null = null;
  selectedFileName: String | null = null;
  expansionPanel: boolean = false;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    let username = this.localStorageService.get('username') ?? undefined;
    if (username != undefined) {
      User.loadUser(username).then((response) => {
        this.user = response;
        this.user.getProjects().then((response: any) => {
          this.projects = response;
        });
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
        if (response.hasOwnProperty('project_info')) {
          this.snackBar.open(
            'Project ' + response['project_info']['name'] + ' created',
            'Close',
            { duration: 3 * 1000 }
          );
          this.ngOnInit();
          this.formGroup.reset();
          this.resetFile();
          this.expansionPanel = false;
        } else
          this.snackBar.open('Project parameters are not correct', 'Close', {
            duration: 3 * 1000,
          });
      });
    }
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

  resetFile() {
    this.selectedFile = null;
    this.selectedFileSrc = null;
    this.selectedFileName = null;
  }
}
