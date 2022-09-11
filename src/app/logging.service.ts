import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogLevel } from '@prisma/client';
import { LogDto } from 'api/log';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  constructor(private http: HttpClient) {}

  private apiCall(logLevel: LogLevel, message: string) {
    this.http.post('log', { level: logLevel, message } as LogDto).subscribe();
  }

  error(message: string, error?: Error) {
    if (!environment.production) {
      console.error('Logger error: ', error);
    }
    this.apiCall(LogLevel.Error, message);
  }

  warn(message: string) {
    if (!environment.production) {
      console.warn('Logger warning: ', message);
    }
    this.apiCall(LogLevel.Warning, message);
  }

  info(message: string) {
    if (!environment.production) {
      console.info('Logger info: ', message);
    }
    this.apiCall(LogLevel.Info, message);
  }
}
