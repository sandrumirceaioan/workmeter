import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './lists.component';
import { ProjecteditComponent } from '../project-edit/project-edit.component';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';
//import { ProjectsResolve } from './projects.resolve';
import { ProjectResolve } from '../project/project.resolve';

const routes: Routes = [
  {
    path: '',
    component: ListsComponent,
    data: {title: 'Lists', access: ['admin','manager']},
    canActivate: [CanActivateAuthGuard]
    // resolve: {
    //   projects: ProjectsResolve
    // }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class ListsRoutingModule { }