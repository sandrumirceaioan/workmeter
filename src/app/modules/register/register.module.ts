import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { ValidationErrors } from '../../shared/directives/validation-errors/validation-errors.component';
import { ValidationService } from '../../shared/services/validation/validation.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [RegisterComponent, ValidationErrors],
  providers: [ValidationService],
  exports: []
})
export class RegisterModule { }
