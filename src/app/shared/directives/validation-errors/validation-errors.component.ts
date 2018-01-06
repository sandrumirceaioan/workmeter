import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { FormControl} from '@angular/forms';

@Component({
  selector: 'validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.css']
})
export class ValidationErrors {
  @Input() control: FormControl;
  @Input() input: string;
  message: string;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
  }

  showErrorMessage(control){
    if (control.errors !== null) {
      let icon = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i>`;
      for (let error in control.errors) {
        switch(error){
          case 'required':
            this.message = `${icon} ${this.input} is required`;
          break;
          case 'email':
            this.message = `${icon} ${this.input} is not valid`;
          break;
          case 'minlength':
            let length = control.errors.minlength.requiredLength - control.errors.minlength.actualLength;
            this.message = `${icon} ${this.input} requires <strong>${length}</strong> more charachters`;
          break;
          case 'hashTag':
            this.message = `${icon} Charachter <strong>${control.errors.hashTag.char}</strong> is not allowed in ${this.input}`;
          break;
          default:
            return 'Something wrong with your input';
        }
        return this.message;
      }
    }
    return null;
  }

}
