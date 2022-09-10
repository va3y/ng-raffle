import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RaffleRecordDto } from 'api/get-form';
import { debounceTime, Subscription } from 'rxjs';
import { LoggingService } from './logging.service';

const THE_MINIMUM_TIME_BACKEND_CAN_HANDLE_MS = 25;

export enum SyncStatus {
  Synced = 'synced',
  Loading = 'loading',
  Error = 'error',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  form = this.fb.group<RaffleRecordDto>({
    email: '',
    firstName: '',
    familyName: '',
    gender: '',
    dateOfBirth: '',
    profilePhoto: '',
  });

  syncStatus = SyncStatus.Loading;
  pendingRequest?: Subscription;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private logging: LoggingService
  ) {}

  ngOnInit() {
    this.logging.info('Main page visit');

    this.http.get<RaffleRecordDto>('get-form').subscribe({
      next: (res) => {
        this.form.setValue(res, { emitEvent: false });
        this.syncStatus = SyncStatus.Synced;
      },
      error: (err) => {
        this.logging.info('Error when fetching initial form data');
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
          error: (err) => {
            this.logging.info('Error when syncing form data');
            this.syncStatus = SyncStatus.Error;
          },
        });
      });
  }
}
