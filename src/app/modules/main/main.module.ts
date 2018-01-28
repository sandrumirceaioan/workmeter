import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HeaderComponent } from '../header/header.component';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { MainRoutingModule } from './main.routing';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  declarations: [MainComponent, HeaderComponent, NavigationComponent, SidemenuComponent],
  providers: [
    CanActivateAuthGuard
  ],
  exports: []
})
export class MainModule { }
