import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { Page404Component } from './page404.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, data: {title: 'Register'}},
  { path: 'login', component: LoginComponent, data: {title: 'Login'}},
  { path: '404', component: Page404Component},
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{useHash:false})],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }