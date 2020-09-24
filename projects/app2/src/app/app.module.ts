import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';







import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { View3Component } from './view3/view3.component';
import { View4Component } from './view4/view4.component';
import { NavComponent } from './nav/nav.component';

const providers = [];

@NgModule({
  declarations: [
    AppComponent,
    View3Component,
    View4Component,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],





  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule { }

@NgModule({})
export class App2SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: providers,
    }
  }
}
