import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';
import { DashboardRoutingModule } from './dashboard.routing'; 

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [DashboardComponent],
  providers: [
    CanActivateAuthGuard
  ],
  exports: []
})
export class DashboardModule { }
