import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from '../header/header.component';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { NavigationComponent } from '../navigation/navigation.component';

import { ValidationService } from '../../shared/services/validation/validation.service';
import { DashboardRoutingModule } from './dashboard.routing';
import { CanActivateAuthGuard } from './dashboard.authGuard';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [DashboardComponent, HeaderComponent, NavigationComponent, SidemenuComponent],
  providers: [
    ValidationService,
    CanActivateAuthGuard
  ],
  exports: []
})
export class DashboardModule { }
