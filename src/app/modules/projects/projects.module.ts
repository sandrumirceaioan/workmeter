import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectsRoutingModule } from './projects.routing';
import { UsersService } from '../../shared/services/users/users.service';
import { ProjectsComponent } from './projects.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectsRoutingModule
  ],
  declarations: [ProjectsComponent],
  providers: [UsersService]
})

export class ProjectsModule { }
