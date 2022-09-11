import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RaffleFormService } from './raffle-form/raffle-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  getFormRequest?: Subscription;

  constructor(public formService: RaffleFormService) {}

  ngOnInit() {
    this.formService.getForm().subscribe();
  }

  ngOnDestroy(): void {
    this.getFormRequest?.unsubscribe();
  }
}
