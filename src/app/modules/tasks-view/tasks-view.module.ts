import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksViewComponent } from './tasks-view.component';
import { TasksViewRoutingModule } from './tasks-view.routing';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { TaskResolve } from '../tasks/task.resolve';
import { TasksUpdateComponent } from '../tasks-update/tasks-update.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TasksViewRoutingModule,
    NgxMyDatePickerModule.forRoot()
  ],
  declarations: [TasksViewComponent, TasksUpdateComponent],
  providers: [TaskResolve]
})
export class TasksViewModule { }
