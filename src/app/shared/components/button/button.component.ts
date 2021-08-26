import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';

type ButtonTypes = 'basic' | 'flat';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']

})
export class ButtonComponent implements AfterViewInit {

  @Input()
  styles: { [key: string]: string } = {};

  @Input()
  isRounded = true;

  @Input()
  type: ButtonTypes = 'flat';

  @Output()
  onClick = new EventEmitter<void>();

  @ViewChild('buttonElement')
  buttonElement!: ElementRef<HTMLButtonElement>;

  constructor(private _renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.isRounded && this._renderer.addClass(this.buttonElement.nativeElement, 'button__rounded');
    this._renderer.addClass(this.buttonElement.nativeElement, `button__${this.type}`)
  }

  public clickHandler = () => {
    this.onClick.emit();
  };

}
