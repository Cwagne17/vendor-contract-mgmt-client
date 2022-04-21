import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { SnackbarService } from './services/snackbar.service';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private destroyed$: Subject<boolean> = new Subject();
  
  constructor(
    private snackbarService: SnackbarService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.snackbarService.notification$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((notif) => {
        if (notif) {
          this._snackBar.openFromComponent(SnackbarComponent, {
            data: {
              title: notif.title,
              message: notif.message,
              color: notif.color,
              callbacks: notif.callbacks,
            },
            duration:
              notif.callbacks && notif.callbacks.length > 0 ? undefined : 4000,
            direction: 'ltr',
            panelClass: 'mat-snackbar',
          });
        }
      });
  }
}
