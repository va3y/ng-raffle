import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { httpInterceptorProviders } from './http-interceptors';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';

import { LoadingIndicatorComponent } from './raffle-form/loading-indicator/loading-indicator.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RaffleFormComponent } from './raffle-form/raffle-form.component';
import { HeaderComponent } from './header/header.component';
import { FaffleFormFieldComponent } from './raffle-form/raffle-form-field/raffle-form-field.component';
import { MatRadioModule } from '@angular/material/radio';
import { CurrentComponentDirective } from './current-component.directive';
import { LoaderComponent } from './raffle-form/loader/loader.component';
import { SuccessComponent } from './raffle-form/success/success.component';
import { NotAvailableComponent } from './raffle-form/not-available/not-available.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    LoadingIndicatorComponent,
    RaffleFormComponent,
    HeaderComponent,
    FaffleFormFieldComponent,
    CurrentComponentDirective,
    LoaderComponent,
    SuccessComponent,
    NotAvailableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatRadioModule,
    MatIconModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
