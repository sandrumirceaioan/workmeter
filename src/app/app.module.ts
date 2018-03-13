import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './shared/interceptors/request.interceptor';

/* main components */
import { AppComponent } from './app.component';
import { ToastComponent } from '../app/shared/directives/toast/toast.component';

/* app modules */
import { LoginModule } from './modules/login/login.module';
import { Page404Component } from './page404.component';
import { AppBootstrapModule } from './shared/modules/app-bootstrap.module';

/* global services */
import { ToastService } from './shared/services/toast/toast.service';
import { UsersService } from './shared/services/users/users.service';

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
    AppRoutingModule,
    AppBootstrapModule
  ],
  providers: [
    ToastService,
    UsersService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
