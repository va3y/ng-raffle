import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RaffleFormService } from './raffle-form.service';

export enum SyncStatus {
  Synced = 'synced',
  Loading = 'loading',
  Error = 'error',
}

@Component({
  selector: 'app-raffle-form',
  templateUrl: './raffle-form.component.html',
  styleUrls: ['./raffle-form.component.css'],
})
export class RaffleFormComponent implements OnInit, OnDestroy {
  getFormRequest?: Subscription;

  constructor(public formService: RaffleFormService) {}

  ngOnInit() {
    this.getFormRequest = this.formService.getForm().subscribe();
  }

  ngOnDestroy(): void {
    this.getFormRequest?.unsubscribe();
  }
}
