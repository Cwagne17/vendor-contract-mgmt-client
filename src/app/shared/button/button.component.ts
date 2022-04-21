import { trigger, transition, style, animate } from '@angular/animations';
import { Component, ContentChild, HostBinding, Input, OnInit } from '@angular/core';

type ButtonType = 'solid' | 'link';

export type ButtonStyle =
  | 'primary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'cancel';

type ButtonSize = 'small' | 'default' | 'large';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  animations: [
    trigger('loading', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms ease', style({ opacity: 0 })),
      ]),
    ]),
  ]
})
export class ButtonComponent {
  @Input() buttonSize: ButtonSize = 'default';
  @Input() buttonType: ButtonType = 'solid';
  @Input() buttonStyle: ButtonStyle | string = 'primary'; // String is also accepted so the button style can vary in the snackbar component
  @Input() @HostBinding('class.button--block') block: boolean = false;
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;

  get classes() {
    return {
      'button--disabled': this.disabled,
      'button--loading': this.loading,
      ['button--type-' + this.buttonType]: true,
      ['button--style-' + this.buttonStyle]: true,
      ['button--size-' + this.buttonSize]: true,
    };
  }

}
