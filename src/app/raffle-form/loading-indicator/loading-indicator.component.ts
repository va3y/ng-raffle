import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { SyncStatus } from '../raffle-form.service';

@Component({
  selector: 'app-loading-indicator[status]',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css'],
})
export class LoadingIndicatorComponent {
  @Input() status!: SyncStatus | null;

  get statusText() {
    switch (this.status) {
      case SyncStatus.Loading:
        return 'Saving...';
      default:
      case SyncStatus.Synced:
        return 'Your data is saved';
      case SyncStatus.Untouched:
        return 'The data is saved automatically';
      case SyncStatus.Error:
      case null:
        return 'Data failed to save';
    }
  }

  get progressSpinnerMode(): ProgressBarMode {
    return this.status === SyncStatus.Loading ? 'indeterminate' : 'determinate';
  }

  get progressColor(): ThemePalette {
    switch (this.status) {
      case SyncStatus.Loading:
        return 'accent';
      default:
      case SyncStatus.Synced:
        return 'primary';
      case SyncStatus.Error:
      case null:
        return 'warn';
    }
  }
}
