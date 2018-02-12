import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectsRoutingModule } from './projects.routing';
import { ProjectsComponent } from './projects.component';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';
import { ProjectComponent } from '../project/project.component';
import { ProjecteditComponent } from '../project-edit/project-edit.component';
import { ProjectsService } from '../../shared/services/projects/projects.service';
import { ProjectsResolve } from './projects.resolve';
import { ProjectResolve } from '../project/project.resolve';
import { ListFilterPipe } from '../../shared/filters/search-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectsRoutingModule
  ],
  declarations: [ProjectsComponent, ProjectComponent, ProjecteditComponent, ListFilterPipe],
  providers: [CanActivateAuthGuard, ProjectsService, ProjectsResolve, ProjectResolve]
})

export class ProjectsModule { }
