import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Output()
  onClick = new EventEmitter<void>();

  public clickHandler = () => {
    this.onClick.emit();
  }

  constructor() { }

}
