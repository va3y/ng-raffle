import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCurrentComponent]',
})
export class CurrentComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
