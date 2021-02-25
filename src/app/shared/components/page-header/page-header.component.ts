import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-page-header',
  styleUrls: ['./page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `
    <header class='app-page-header'>
      <h1 class='app-page-header-title'>{{pageTitle}}</h1>
      <span class='app-page-header-separator'></span>
      <ng-content></ng-content>
    </header>
  `,
})
export class PageHeaderComponent implements OnInit {

  @Input()
  readonly pageTitle: string;

  ngOnInit(): void {
  }

}
