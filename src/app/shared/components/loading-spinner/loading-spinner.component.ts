import {Component} from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  styleUrls: ['./loading-spinner.component.scss'],
  template: `
    <div class="app-loading-spinner-wrapper">
      <div class="app-loading-spinner">
        <div></div><div></div><div></div><div></div>
        <div></div><div></div><div></div><div></div>
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  `
})
export class LoadingSpinnerComponent {}
