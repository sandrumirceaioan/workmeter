import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';
import { TasksComponent } from './tasks.component';
import { TasksService } from '../../shared/services/tasks/tasks.service';
import { TasksRoutingModule } from './tasks.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TasksRoutingModule
  ],
  declarations: [TasksComponent],
  providers: [CanActivateAuthGuard,TasksService]
})
export class TasksModule { }
