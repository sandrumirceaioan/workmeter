import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CanActivateAuthGuard } from './dashboard.authGuard';
import { LoggedResolve } from './dashboard.logged.resolve';

const routes: Routes = [
  { 
    path: '', 
    component: DashboardComponent, 
    data: {title: 'Dashboard'},
    // resolve: {
    //   logged: LoggedResolve
    // }
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class DashboardRoutingModule { }