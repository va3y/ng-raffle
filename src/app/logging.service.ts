import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogLevel } from '@prisma/client';
import { LogDto } from 'api/log';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  constructor(private http: HttpClient) {}

  private apiCall(logLevel: LogLevel, message: string) {
    this.http.post('log', { level: logLevel, message } as LogDto);
  }

  error(message: string) {
    this.apiCall(LogLevel.Error, message);
  }

  warn(message: string) {
    this.apiCall(LogLevel.Warning, message);
  }

  info(message: string) {
    this.apiCall(LogLevel.Info, message);
  }
}
