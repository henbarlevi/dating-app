import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
//Auth
import {
  LoginComponent,
  LoggedInGuard
  , AuthService
} from './auth'
import { routing} from './app.routing';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [AuthService,LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
