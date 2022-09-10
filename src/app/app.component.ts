import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GetFormResponse } from 'api/get-form';
import { debounceTime, Observable } from 'rxjs';

const THE_MINIMUM_TIME_BACKEND_CAN_HANDLE_MS = 1000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  form = this.fb.group<GetFormResponse>({
    email: '',
    firstName: '',
    familyName: '',
    gender: '',
    dateOfBirth: '',
    profilePhoto: '',
  });

  constructor(private fb: FormBuilder, http: HttpClient) {
    http.get<GetFormResponse>('get-form').subscribe({
      next: (res) => {
        this.form.setValue(res);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.form.valueChanges
      .pipe(debounceTime(THE_MINIMUM_TIME_BACKEND_CAN_HANDLE_MS))
      .subscribe((value) => {
        http.post('save-form', value).subscribe({
          next: (res) => {
            console.log('res: ', res);
          },
          error: (err) => {
            console.log(err);
          },
        });
      });
  }
}
