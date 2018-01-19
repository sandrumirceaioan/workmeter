import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { Page404Component } from './page404.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', loadChildren: './modules/register/register.module#RegisterModule'},
  { path: 'dashboard', loadChildren:'./modules/dashboard/dashboard.module#DashboardModule'},
  { path: 'login', component: LoginComponent, data: {title: 'Login'}},
  { path: '**', component: Page404Component}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{useHash:false})],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }