import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CanActivateAuthGuard } from './dashboard.authGuard';

const routes: Routes = [
  {
    path: '', 
    component: DashboardComponent, 
    data: {title: 'Dashboard', access: ['admin','user']},
    children: [
      { path: 'projects', loadChildren: '../projects/projects.module#ProjectsModule'}
    ],
    canActivate: [CanActivateAuthGuard]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class DashboardRoutingModule { }