import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';
import { TasksComponent } from './tasks.component';
import { TasksViewComponent } from '../tasks-view/tasks-view.component';
import { TaskResolve } from './task.resolve';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    data: {title: 'Tasks', access: ['admin','manager', 'user']},
    children: [
      {
        path: ':id', 
        component: TasksViewComponent,
        data: {title: 'Task', access: ['admin', 'manager', 'user']},
        canActivate: [CanActivateAuthGuard],
        resolve: {
          task: TaskResolve
        }
      },
    ]
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