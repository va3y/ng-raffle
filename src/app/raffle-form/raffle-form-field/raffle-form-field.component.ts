import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { Field } from 'api-utils/formSchema';

@Component({
  selector: 'app-raffle-form-field',
  templateUrl: './raffle-form-field.component.html',
  styleUrls: ['./raffle-form-field.component.css'],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
  ],
})
export class FaffleFormFieldComponent {
  @Input() field!: Field;
  @Input() form!: FormGroup;

  constructor() {}
}
