import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ListsRoutingModule } from './lists.routing';
import { ListsService } from '../../shared/services/lists/lists.service';
import { ListsComponent } from './lists.component';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';
import { ListsFilterPipe } from '../../shared/filters/lists-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ListsRoutingModule
  ],
  declarations: [ListsComponent, ListsFilterPipe],
  providers: [CanActivateAuthGuard, ListsService]
})

export class ListsModule { }
