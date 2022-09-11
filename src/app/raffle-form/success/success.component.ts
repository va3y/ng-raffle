import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
})
export class SuccessComponent {
  @Input() totalSubmssions!: number;

  constructor() {}

  get winChancePercent() {
    return (100 / this.totalSubmssions).toPrecision(3);
  }
}
