import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RaffleRecordStatus } from '@prisma/client';
import { Schema } from 'api-utils/formSchema';
import { GetFormResponse } from 'api/get-form';
import { BehaviorSubject, debounceTime, Subscription, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggingService } from '../logging.service';
import { SyncStatus } from './raffle-form.component';

const THE_MINIMUM_TIME_BACKEND_CAN_HANDLE_MS = 100;

@Injectable({
  providedIn: 'root',
})
export class RaffleFormService {
  form: FormGroup = this.fb.group({});
  formLoaded = new BehaviorSubject(false);
  syncStatus = SyncStatus.Loading;
  submitStatus: RaffleRecordStatus = RaffleRecordStatus.Filling;
  schema: Schema = { steps: [] };

  private pendingRequest?: Subscription;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private logging: LoggingService,
    private snackBar: MatSnackBar
  ) {}

  submitForm() {
    this.formLoaded.next(false);
    return this.http.post('submit-form', this.form.getRawValue()).subscribe({
      complete: () => {
        this.formLoaded.next(true);
        this.submitStatus = RaffleRecordStatus.Submitted;
      },
      error: () => {
        this.snackBar.open(
          'Failed to fetch the data. Try again later',
          'Close'
        );
        this.syncStatus = SyncStatus.Error;
      },
    });
  }

  getForm() {
    return this.http.get<GetFormResponse>('get-form').pipe(
      tap((res) => {
        this.syncStatus = SyncStatus.Synced;
        this.formLoaded.next(true);
        this.schema = res.schema;
        this.submitStatus = res.status;
        this.form = this.fb.group(fieldsFromSchema(this.schema));

        this.form.valueChanges
          .pipe(debounceTime(THE_MINIMUM_TIME_BACKEND_CAN_HANDLE_MS))
          .subscribe((value) => {
            this.saveForm(value);
          });

        return res;
      }),
      catchError((err) => {
        this.logging.error('Error when fetching initial form data');
        this.snackBar.open(
          'Failed to fetch the data. Try again later',
          'Close'
        );
        this.syncStatus = SyncStatus.Error;

        return err;
      })
    );
  }

  private saveForm(value: Schema) {
    this.syncStatus = SyncStatus.Loading;
    this.pendingRequest?.unsubscribe();

    this.pendingRequest = this.http.post('save-form', value).subscribe({
      next: (res) => {
        this.syncStatus = SyncStatus.Synced;
      },
      error: (error) => {
        this.logging.error('Error when syncing form data');
        this.snackBar.open('Failed to refresh the data', 'Close');

        this.syncStatus = SyncStatus.Error;
      },
    });
  }
}

function fieldsFromSchema(schema: Schema) {
  const fields: Record<string, string | null> = {};

  for (const step of schema.steps) {
    for (const field of step.fields) {
      fields[field.code] = field.value;
    }
  }

  return fields;
}
