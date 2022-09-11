import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Type } from 'src/global';
import { CurrentComponentDirective } from './current-component.directive';
import { LoaderComponent } from './raffle-form/loader/loader.component';
import { RaffleFormComponent } from './raffle-form/raffle-form.component';
import { RaffleFormService } from './raffle-form/raffle-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(CurrentComponentDirective, { static: true })
  currentComponent!: CurrentComponentDirective;

  getFormRequest?: Subscription;

  constructor(public formService: RaffleFormService) {}

  ngOnInit() {
    this.setComponent(LoaderComponent);
    this.formService.getForm().subscribe(() => {
      this.setComponent(RaffleFormComponent);
    });
  }

  ngOnDestroy(): void {
    this.getFormRequest?.unsubscribe();
  }

  private setComponent<C>(component: Type<C>) {
    this.currentComponent.viewContainerRef.clear();
    this.currentComponent.viewContainerRef.createComponent(component);
  }
}
