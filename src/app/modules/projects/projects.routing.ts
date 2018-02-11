import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';
import { ProjectsResolve } from './projects.resolve';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    data: {title: 'Projects', access: ['admin']},
    canActivate: [CanActivateAuthGuard],
    resolve: {
      projects: ProjectsResolve
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class ProjectsRoutingModule { }