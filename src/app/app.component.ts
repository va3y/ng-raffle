import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';

const THE_MINIMUM_TIME_POSSIBLE_BACKEND_CAN_HANDLE_MS = 1000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  emailForm = this.fb.group({
    email: '',
  });
  userInfoForm = this.fb.group({
    firstName: '',
    familyName: '',
  });
  fileForm = this.fb.group({
    file: null,
  });

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.emailForm.valueChanges
      .pipe(debounceTime(THE_MINIMUM_TIME_POSSIBLE_BACKEND_CAN_HANDLE_MS))
      .subscribe((value) => {
        http.get('/save-form').subscribe((e) => e);
        console.log('savnin some', value);
      });
  }
}
