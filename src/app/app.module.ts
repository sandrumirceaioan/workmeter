import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/* main components */
import { AppComponent } from './app.component';
import { ToastComponent } from '../app/shared/directives/toast/toast.component';

/* routing module */
import { AppRoutingModule } from './app-routing.module';

/* app modules */
import { LoginModule } from './modules/login/login.module';
import { RegisterModule } from './modules/register/register.module';
import { Page404Component } from './page404.component';


@NgModule({
  declarations: [
    AppComponent,
    ToastComponent,
    Page404Component
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoginModule,
    RegisterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
