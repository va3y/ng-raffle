import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from 'api-utils/formSchema';

@Component({
  selector: 'app-raffle-form-field',
  templateUrl: './raffle-form-field.component.html',
  styleUrls: ['./raffle-form-field.component.css'],
})
export class FaffleFormFieldComponent {
  @Input() field!: Field;
  @Input() form!: FormGroup;

  constructor() {}
}
