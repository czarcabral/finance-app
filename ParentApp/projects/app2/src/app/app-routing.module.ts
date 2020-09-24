import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { View3Component } from './view3/view3.component';
import { View4Component } from './view4/view4.component';

const routes: Routes = [
  { path: 'app2/three', component: View3Component },
  { path: 'app2/four', component: View4Component },
  { path: 'app2', redirectTo: 'app2/three' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
