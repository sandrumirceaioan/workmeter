import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[exclude][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ExcludeCharacter), multi: true }
  ]
})
export class ExcludeCharacter implements Validator {
  @Input('exclude') exclude:string;
  
  constructor() {}
  
  validate(c: FormControl) {
    console.log(c.value);
    if (c.value && c.value.indexOf(this.exclude) !== -1) {
      return {
        exclude: false,
        error: `Charachter ${this.exclude} is not allowed!`
      }
    } else {
      return null;
    }
  }
  
}