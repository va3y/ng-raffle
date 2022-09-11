import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RaffleRecordDto } from 'api/get-form';
import { debounceTime, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

export enum SyncStatus {
  Synced = 'synced',
  Loading = 'loading',
  Error = 'error',
}

const THE_MINIMUM_TIME_BACKEND_CAN_HANDLE_MS = 25;

const SCHEMA = {
  steps: [
    {
      name: 'Start',
      fields: [
        {
          fieldType: 'text',
          value: '',
          label: 'Email',
          required: true,
          placeholder: '',
        },
      ],
    },
  ],
};

@Component({
  selector: 'app-raffle-form',
  templateUrl: './raffle-form.component.html',
  styleUrls: ['./raffle-form.component.css'],
})
export class RaffleFormComponent implements OnInit {
  form = this.fb.group<RaffleRecordDto>({
    email: null,
    firstName: null,
    familyName: null,
    gender: null,
    dateOfBirth: null,
    profilePhoto: null,
  });

  syncStatus = SyncStatus.Loading;
  pendingRequest?: Subscription;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private logging: LoggingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.logging.info('Main page visit');
    this.http.get<RaffleRecordDto>('get-form').subscribe({
      next: (res) => {
        this.syncStatus = SyncStatus.Synced;
        this.form.setValue(res, { emitEvent: false });
      },
      error: (error) => {
        this.logging.error('Error when fetching initial form data', error);
        this.snackBar.open(
          'Failed to fetch the data. Try again later',
          'Close'
        );
        this.syncStatus = SyncStatus.Error;
      },
    });

    this.form.valueChanges
      .pipe(debounceTime(THE_MINIMUM_TIME_BACKEND_CAN_HANDLE_MS))
      .subscribe((value) => {
        this.syncStatus = SyncStatus.Loading;
        this.pendingRequest?.unsubscribe();

        this.pendingRequest = this.http.post('save-form', value).subscribe({
          next: (res) => {
            this.syncStatus = SyncStatus.Synced;
          },
          error: (error) => {
            this.logging.error('Error when syncing form data', error);
            this.snackBar.open('Failed to refresh the data', 'Close');

            this.syncStatus = SyncStatus.Error;
          },
        });
      });
  }
}
