import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as AuthActions from './modules/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
