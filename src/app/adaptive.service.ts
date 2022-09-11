import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdaptiveService {
  isMobile: Observable<boolean>;

  constructor(breakpointObserver: BreakpointObserver) {
    this.isMobile = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? false : true)));
  }
}
