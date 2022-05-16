import { LayoutModule } from '@angular/cdk/layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogAddMemberComponent } from './dialog-add-member/dialog-add-member.component';
import { DialogProjectDeleteComponent } from './dialog-project-delete/dialog-project-delete.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ProjectDescriptionComponent } from './project-description/project-description.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { RegisterComponent } from './register/register.component';
import { TestComponent } from './test/test.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    UserProfileComponent,
    ProjectDescriptionComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    ProjectListComponent,
    ProjectManagementComponent,
    DialogProjectDeleteComponent,
    DialogAddMemberComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule,
    FlexLayoutModule,
    LayoutModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ScrollingModule,
    FormsModule,
    MatNativeDateModule,
    MatRippleModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTabsModule,
    MatExpansionModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
    RouterModule.forRoot([
      { path: 'user/:username', component: UserProfileComponent },
      { path: 'projects/:username', component: ProjectManagementComponent },
      { path: 'project/:projectId', component: ProjectDescriptionComponent },
      { path: 'test', component: TestComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', component: MainComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
