import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjecteditComponent } from '../project-edit/project-edit.component';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';
import { ProjectsResolve } from './projects.resolve';
import { ProjectResolve } from '../project/project.resolve';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    data: {title: 'Projects', access: ['admin']},
    canActivate: [CanActivateAuthGuard]
  },
  { path: ':id',
    component: ProjecteditComponent,
    data: {title: 'Edit Project', access: ['admin']},
    canActivate: [CanActivateAuthGuard],
    resolve: {
      project: ProjectResolve
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class ProjectsRoutingModule { }