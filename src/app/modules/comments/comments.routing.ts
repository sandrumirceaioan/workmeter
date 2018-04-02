import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEditComponent } from '../list-edit/list-edit.component';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';
import { CommentsComponent } from './comments.component';

const routes: Routes = [
  {
    path: '',
    component: CommentsComponent,
    data: {title: 'Comments', access: ['admin','manager']},
    canActivate: [CanActivateAuthGuard]
  },
  // {
  //   path: ':id',
  //   component: ListEditComponent,
  //   data: {title: 'List', access: ['admin', 'manager']},
  //   canActivate: [CanActivateAuthGuard],
  //   resolve: {
  //     list: ListResolve
  //   },
  // }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class CommentsRoutingModule { }