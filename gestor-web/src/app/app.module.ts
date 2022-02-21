import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { ProjectExpensesComponent } from './project-expenses/project-expenses.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    UserProfileComponent,
    UserListComponent,
    ProjectExpensesComponent,
    ExpensesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'users', component: UserListComponent },
      { path: 'users/:username', component: UserProfileComponent },
      { path: 'projects/:projectId', component: ProjectExpensesComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
