import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';
import { TasksComponent } from './tasks.component';
import { TasksService } from '../../shared/services/tasks/tasks.service';
import { TasksRoutingModule } from './tasks.routing';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { ProjectsResolve } from '../projects/projects.resolve';
import { ListsResolve } from '../lists/lists.resolve';
import { UsersResolve } from '../users/users.resolve';
import { TasksViewComponent } from '../tasks-view/tasks-view.component';
import { TaskResolve } from './task.resolve';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TasksRoutingModule,
    NgxMyDatePickerModule.forRoot()
  ],
  declarations: [TasksComponent, TasksViewComponent],
  providers: [CanActivateAuthGuard,TasksService, TaskResolve]
})
export class TasksModule { }
