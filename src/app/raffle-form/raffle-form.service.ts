import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Schema } from 'api-utils/formSchema';
import { debounceTime, Subscription, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggingService } from '../logging.service';
import { SyncStatus } from './raffle-form.component';

const THE_MINIMUM_TIME_BACKEND_CAN_HANDLE_MS = 100;

@Injectable({
  providedIn: 'root',
})
export class RaffleFormService {
  form: FormGroup = this.fb.group({});
  formLoaded = false;
  syncStatus = SyncStatus.Loading;
  schema: Schema = { steps: [] };

  private pendingRequest?: Subscription;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private logging: LoggingService,
    private snackBar: MatSnackBar
  ) {}

  submitForm() {
    this.formLoaded = false;
    return this.http.post('submit-form', this.form.getRawValue());
  }

  getForm() {
    return this.http.get<Schema>('get-form').pipe(
      tap((res) => {
        this.syncStatus = SyncStatus.Synced;
        this.formLoaded = true;
        this.schema = res;
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

function fieldsFromSchema(schema: Schema): Record<string, string> {
  const fields: Record<string, string> = {};

  for (const step of schema.steps) {
    for (const field of step.fields) {
      fields[field.code] = field.value;
    }
  }

  return fields;
}
