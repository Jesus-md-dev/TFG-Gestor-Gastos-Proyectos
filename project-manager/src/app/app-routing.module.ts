import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestPageComponent } from './test-page/test-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test', component: TestPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
