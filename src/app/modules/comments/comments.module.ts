import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ListEditComponent } from '../list-edit/list-edit.component';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';
import { ListsFilterPipe } from '../../shared/filters/lists-filter.pipe';
import { CommentsComponent } from './comments.component';
import { CommentsRoutingModule } from './comments.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommentsRoutingModule
  ],
  declarations: [CommentsComponent],
  providers: [CanActivateAuthGuard]
})

export class CommentsModule { }
