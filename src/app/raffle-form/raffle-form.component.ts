import { Component } from '@angular/core';
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
export class RaffleFormComponent {
  constructor(public formService: RaffleFormService) {}
}