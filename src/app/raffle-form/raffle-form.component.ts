import { StepperOrientation } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { map, Observable } from 'rxjs';
import { AdaptiveService } from '../adaptive.service';
import { RaffleFormService } from './raffle-form.service';

@Component({
  selector: 'app-raffle-form',
  templateUrl: './raffle-form.component.html',
  styleUrls: ['./raffle-form.component.css'],
})
export class RaffleFormComponent {
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    public formService: RaffleFormService,
    public adaptive: AdaptiveService
  ) {
    this.stepperOrientation = adaptive.isMobile.pipe(
      map((isMobile) => (isMobile ? 'vertical' : 'horizontal'))
    );
  }

  // A less hacky was is to probably handle enter natively, making multiple <form /> elements.
  // But with time constraints, that's the easier way for now
  onEnter(e: Event, stepper: MatStepper) {
    e.preventDefault();
    stepper.next();
  }
}
