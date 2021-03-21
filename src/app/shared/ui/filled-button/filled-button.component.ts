import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filled-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./filled-button.component.scss'],
  template: `
    <button class='app-filled-button' (click)="onButtonClicked($event)" [disabled]="disabled">
      <ng-content></ng-content>
    </button>
  `
})
export class FilledButtonComponent {

  @Input()
  disabled: boolean;

  @Output()
  buttonClicked = new EventEmitter<Event>();

  constructor() { }

  onButtonClicked(e: Event): void {
    this.buttonClicked.emit(e);
  }
}
