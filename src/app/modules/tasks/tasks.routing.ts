import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';
import { TasksComponent } from './tasks.component';
import { TasksViewComponent } from '../tasks-view/tasks-view.component';
import { TaskResolve } from './task.resolve';
import { ProjectsResolve } from '../projects/projects.resolve';
import { ListsResolve } from '../lists/lists.resolve';
import { UsersResolve } from '../users/users.resolve';
import { CommentsComponent } from '../comments/comments.component';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    data: { title: 'Tasks', access: ['admin', 'manager', 'user'] },
    children: [
      {
        path: ':id',
        component: TasksViewComponent,
        data: { title: 'Task', access: ['admin', 'manager', 'user'] },
        resolve: {
          task: TaskResolve
        }
      },
      {
        path: ':id/comments',
        loadChildren:  '../comments/comments.module#CommentsModule',
        data: { title: 'Task Comments', access: ['admin', 'manager', 'user'] },
        resolve: {
          task: TaskResolve
        }
      }
    ],
    resolve: {
      projects: ProjectsResolve,
      lists: ListsResolve,
      users: UsersResolve
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }