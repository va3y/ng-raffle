import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddBaseUrlInterceptor } from './add-base-url';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AddBaseUrlInterceptor, multi: true },
];
