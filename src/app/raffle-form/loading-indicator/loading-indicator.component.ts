import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { SyncStatus } from '../raffle-form.component';

@Component({
  selector: 'app-loading-indicator[status]',
  templateUrl: './loading-indicator.component.html',
})
export class LoadingIndicatorComponent {
  @Input() status!: SyncStatus;

  get statusText() {
    return {
      [SyncStatus.Loading]: 'Saving...',
      [SyncStatus.Synced]: 'The data is saved',
      [SyncStatus.Error]: 'Data failed to save',
    }[this.status];
  }

  get progressSpinnerMode(): ProgressBarMode {
    return this.status === SyncStatus.Loading ? 'indeterminate' : 'determinate';
  }

  get progressColor(): ThemePalette {
    const colorMap: Record<SyncStatus, ThemePalette> = {
      [SyncStatus.Error]: 'warn',
      [SyncStatus.Loading]: 'accent',
      [SyncStatus.Synced]: 'primary',
    };
    return colorMap[this.status];
  }
}
