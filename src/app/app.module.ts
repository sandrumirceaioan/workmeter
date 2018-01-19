import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'


/* main components */
import { AppComponent } from './app.component';
import { ToastComponent } from '../app/shared/directives/toast/toast.component';

/* app modules */
import { LoginModule } from './modules/login/login.module';
import { Page404Component } from './page404.component';

/* global services */
import { ToastService } from './shared/services/toast/toast.service';

/* routing module */
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    ToastComponent,
    Page404Component
  ],
  imports: [
    HttpClientModule,
    AngularFontAwesomeModule,
    BrowserModule,
    BrowserAnimationsModule,
    LoginModule,
    AppRoutingModule
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
