import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { ExcludeCharacter } from '../../directives/exclude-character.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [RegisterComponent, ExcludeCharacter],
  exports: [ExcludeCharacter]
})
export class RegisterModule { }
