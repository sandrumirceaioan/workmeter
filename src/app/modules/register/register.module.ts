import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { ValidationErrors } from '../../shared/directives/validation-errors/validation-errors.component';
import { ValidationService } from '../../shared/services/validation/validation.service';
import { RegisterRoutingModule } from './register.routing';
import { UsersService } from '../../shared/services/users/users.service';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [RegisterComponent, ValidationErrors],
  providers: [ValidationService, UsersService],
  exports: []
})
export class RegisterModule { }
