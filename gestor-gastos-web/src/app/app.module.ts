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
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DialogMemberDeleteComponent } from './dialog-member-delete/dialog-member-delete.component';
import { DialogCreateExpenseComponent } from './dialog-create-expense/dialog-create-expense.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DialogExpenseDeleteComponent } from './dialog-expense-delete/dialog-expense-delete.component';
import { ExpenseDescriptionComponent } from './expense-description/expense-description.component';
import { DialogAccountDeleteComponent } from './dialog-account-delete/dialog-account-delete.component';
import { AccessGuard } from './access.guard';
import { ExpenseViewComponent } from './expense-view/expense-view.component';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { ExpensesTableComponent } from './expenses-table/expenses-table.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { UserExpensesViewComponent } from './user-expenses-view/user-expenses-view.component';
import { UserExpensesTableComponent } from './user-expenses-table/user-expenses-table.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    ProjectDescriptionComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    ProjectListComponent,
    ProjectManagementComponent,
    DialogProjectDeleteComponent,
    DialogAddMemberComponent,
    DialogMemberDeleteComponent,
    DialogCreateExpenseComponent,
    DialogExpenseDeleteComponent,
    ExpenseDescriptionComponent,
    DialogAccountDeleteComponent,
    ExpenseViewComponent,
    ExpensesTableComponent,
    UsersTableComponent,
    UserExpensesViewComponent,
    UserExpensesTableComponent,
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
    MatDatepickerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
    RouterModule.forRoot([
      {
        path: 'user/:username',
        component: UserProfileComponent,
        data: { requiresLogin: true },
        canActivate: [AccessGuard],
      },
      {
        path: 'projects/:username',
        component: ProjectManagementComponent,
        data: { requiresLogin: true },
        canActivate: [AccessGuard],
      },
      {
        path: 'project/:projectId',
        component: ProjectDescriptionComponent,
        data: { requiresLogin: true },
        canActivate: [AccessGuard],
      },
      {
        path: 'expense/:expenseId',
        component: ExpenseViewComponent,
        data: { requiresLogin: true },
        canActivate: [AccessGuard],
      },
      {
        path: 'expenses',
        component: UserExpensesViewComponent,
        data: { requiresLogin: true },
        canActivate: [AccessGuard],
      },
      {
        path: '',
        component: MainComponent,
      },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

registerLocaleData(localeES, 'es');
