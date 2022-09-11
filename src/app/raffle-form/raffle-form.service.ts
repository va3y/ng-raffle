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
import { fieldsFromSchema } from './fieldsFromSchema';

const THE_MINIMUM_TIME_BACKEND_CAN_HANDLE_MS = 100;

export enum SyncStatus {
  Synced = 'synced',
  Loading = 'loading',
  Error = 'error',
  Untouched = 'untouched',
}

export enum FormStatus {
  Loading = 'loading',
  Filling = 'filling',
  Submitted = 'submitted',
  Error = 'error',
}

@Injectable({
  providedIn: 'root',
})
export class RaffleFormService {
  form: FormGroup = this.fb.group({});
  loadingStatus = new BehaviorSubject(FormStatus.Loading);
  syncStatus = new BehaviorSubject(SyncStatus.Untouched);
  schema: Schema = { steps: [] };
  totalSubmissions: number | null = null;

  private pendingRequest?: Subscription;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private logging: LoggingService,
    private snackBar: MatSnackBar
  ) {}

  submitForm() {
    this.loadingStatus.next(FormStatus.Loading);
    return this.http.post('submit-form', this.form.getRawValue()).subscribe({
      complete: () => {
        if (typeof this.totalSubmissions === 'number') this.totalSubmissions++;
        this.loadingStatus.next(FormStatus.Submitted);
      },
      error: () => {
        this.snackBar.open(
          'Failed to fetch the data. Try again later',
          'Close'
        );
        this.loadingStatus.next(FormStatus.Error);
      },
    });
  }

  getForm() {
    return this.http.get<GetFormResponse>('get-form').pipe(
      tap((res) => {
        this.totalSubmissions = res.recordsCount;
        this.loadingStatus.next(
          res.status === RaffleRecordStatus.Filling
            ? FormStatus.Filling
            : FormStatus.Submitted
        );
        this.schema = res.schema;
        this.form = this.fb.group(fieldsFromSchema(this.schema));

        this.form.valueChanges
          .pipe(debounceTime(THE_MINIMUM_TIME_BACKEND_CAN_HANDLE_MS))
          .subscribe((value) => {
            this.saveForm(value);
          });

        return 1;
      }),
      catchError((err) => {
        this.logging.error('Error when fetching initial form data');
        this.snackBar.open(
          'Failed to fetch the data. Try again later',
          'Close'
        );
        this.loadingStatus.next(FormStatus.Error);

        return err;
      })
    );
  }

  private saveForm(value: Schema) {
    this.syncStatus.next(SyncStatus.Loading);
    this.pendingRequest?.unsubscribe();

    this.pendingRequest = this.http.post('save-form', value).subscribe({
      next: (res) => {
        this.syncStatus.next(SyncStatus.Synced);
      },
      error: (error) => {
        this.logging.error('Error when syncing form data');
        this.snackBar.open('Failed to refresh the data', 'Close');

        this.syncStatus.next(SyncStatus.Error);
      },
    });
  }
}
