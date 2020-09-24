import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: 'loan-vs-investment-app/home', component: HomepageComponent },
  { path: 'loan-vs-investment-app', redirectTo: 'loan-vs-investment-app/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
