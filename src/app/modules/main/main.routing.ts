import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';

const routes: Routes = [
  {
    path: '', 
    component: MainComponent,
    data: {title: 'Main', access: ['admin','manager','user']},
    children: [
      { path: '', redirectTo: 'dashboard'},
      { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule'},
      { path: 'projects', loadChildren: '../projects/projects.module#ProjectsModule'}
    ],
    canActivate: [CanActivateAuthGuard],
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class MainRoutingModule { }