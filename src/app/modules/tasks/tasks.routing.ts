import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';
import { ProjectsResolve } from '../projects/projects.resolve';
import { ListsResolve } from '../lists/lists.resolve';
import { UsersResolve } from '../users/users.resolve';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    data: {title: 'Tasks', access: ['admin','manager', 'user']}
    // resolve: {
    //   projects: ProjectsResolve,
    //   lists: ListsResolve,
    //   users: UsersResolve
    // }
  }
//   {
//     path: ':id',
//     component: ListEditComponent,
//     data: {title: 'List', access: ['admin', 'manager']},
//     canActivate: [CanActivateAuthGuard],
//     resolve: {
//       project: ListResolve
//     },
//   }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class TasksRoutingModule { }