import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SNACKBAR_COLOR } from '../shared/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  /**
   * Use this subject to display a new notification on the app
   *
   * @example
   * this.snackbarService.notification$.next({
   *    title: 'NOTIFICATION TITLE',
   *    message: 'NOTIFICATION MESSAGE',
   *    color: SNACKBAR_COLOR.ACCENT
   * });
   */
  public notification$: Subject<{
    title: string;
    message: string;
    color: SNACKBAR_COLOR;
    callbacks?: { action: Function; display: string; style?: string }[];
  }> = new Subject();

  sendNotificationByError(err: HttpErrorResponse) {
    let title: string = 'ERROR';
    let message: string = err.message;

    switch (err.status) {
      case 400:
        title = 'Invalid Input';
        break;
      case 401:
        title = 'Not logged in';
        message = 'Please log in to continue';
        break;
      case 403:
        title = 'Not Authorized';
        message = 'You are not authorized to access this resource.';
        break;
      case 404:
        title = 'Not Found';
        break;
      default:
        title = 'Internal Service Error';
        message = 'Something went wrong. Please try again later.';
        break;
    }

    this.notification$.next({
      title: title,
      message: message,
      color: SNACKBAR_COLOR.DANGER
    });
  }
}
