import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Type } from 'src/global';
import { CurrentComponentDirective } from './current-component.directive';
import { LoaderComponent } from './raffle-form/loader/loader.component';
import { NotAvailableComponent } from './raffle-form/not-available/not-available.component';
import { RaffleFormComponent } from './raffle-form/raffle-form.component';
import {
  FormStatus,
  RaffleFormService,
} from './raffle-form/raffle-form.service';
import { SuccessComponent } from './raffle-form/success/success.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(CurrentComponentDirective, { static: true })
  currentComponent?: CurrentComponentDirective;

  getFormRequest?: Subscription;

  constructor(public formService: RaffleFormService) {}

  ngOnInit() {
    this.formService.getForm().subscribe(() => {});
    this.formService.loadingStatus.subscribe((newStatus) => {
      const component = this.setComponent(
        {
          [FormStatus.Filling]: RaffleFormComponent,
          [FormStatus.Loading]: LoaderComponent,
          [FormStatus.Submitted]: SuccessComponent,
          [FormStatus.Error]: NotAvailableComponent,
        }[newStatus]
      );

      if (component?.instance instanceof SuccessComponent) {
        component.instance.totalSubmssions =
          this.formService.totalSubmissions || 0;
      }
    });
  }

  ngOnDestroy(): void {
    this.getFormRequest?.unsubscribe();
  }

  private setComponent<C>(component: Type<C>) {
    this.currentComponent?.viewContainerRef.clear();
    return this.currentComponent?.viewContainerRef.createComponent(component);
  }
}
