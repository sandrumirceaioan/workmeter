import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { ValidationService } from '../../shared/services/validation/validation.service';
import { DashboardRoutingModule } from './dashboard.routing';
import { UsersService } from '../../shared/services/users/users.service';
import { LoggedResolve } from './dashboard.logged.resolve';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [DashboardComponent, SidemenuComponent],
  providers: [
    ValidationService, 
    UsersService,
    LoggedResolve
  ],
  exports: []
})
export class DashboardModule { }
