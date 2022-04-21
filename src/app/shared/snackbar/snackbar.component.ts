import { Component, Inject, OnInit } from '@angular/core';
import { ButtonStyle } from '../button/button.component';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export enum SNACKBAR_COLOR {
  ACCENT = 'accent',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  GRAY = 'gray',
}

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  title: string = '';
  color: SNACKBAR_COLOR = SNACKBAR_COLOR.ACCENT;
  style: ButtonStyle = 'primary';
  message: string = '';
  callbacks: { display: string; action: Function; style?: ButtonStyle }[] = [];
  
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBar: MatSnackBar
  ) {
    if (this.data.title) {
      this.title = this.data.title;
    }
    if (this.data.message) {
      this.message = this.data.message;
    }
    if (this.data.color) {
      this.color = this.data.color;
    }
    if (this.data.callbacks && this.data.callbacks.length > 0) {
      this.callbacks = this.data.callbacks;
    }

    this.setButtonStyle();
  }

  ngOnInit(): void {}

  /**
   * Performs a action (function) that is passed in the
   * callbacks array and closes the snackbar, supports
   * async functions
   *
   * @param action The action callback
   */
  async performAction(action: Function) {
    await action();
    this.snackBar.dismiss();
  }

  /**
   * Using the provided color enum, dynamically set the
   * button styles
   */
  private setButtonStyle() {
    switch (this.color) {
      case SNACKBAR_COLOR.SUCCESS:
        this.style = 'success';
        break;
      case SNACKBAR_COLOR.DANGER:
        this.style = 'danger';
        break;
      case SNACKBAR_COLOR.WARNING:
        this.style = 'warning';
        break;
      default:
        this.style = 'primary';
        break;
    }
  }
}
