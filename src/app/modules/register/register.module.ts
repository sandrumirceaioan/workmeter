import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
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
    HttpClientModule
  ],
  declarations: [RegisterComponent, ValidationErrors],
  providers: [ValidationService, UsersService],
  exports: []
})
export class RegisterModule { }
