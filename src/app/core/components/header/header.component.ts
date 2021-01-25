import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../../shared/models/user.model';
import { authSelector } from '../../modules/auth/store/auth.reducer';
import * as AuthActions from '../../modules/auth/store/auth.actions';
import * as RecipesActions from '../../../modules/recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  private userAuthSubscription: Subscription;
  public isUserAuthenticated = false;

  constructor(private store: Store) {}

  public onSaveData(): void {
    this.store.dispatch(RecipesActions.storeRecipes());
  }

  public onFetchData(): void {
    this.store.dispatch(RecipesActions.fetchRecipes());
  }

  public onLogOut(): void {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnInit(): void {
    this.userAuthSubscription = this.store.select(authSelector)
      .pipe( map(authState => authState.user))
      .subscribe((user: User) => {
        // user ? true : false
        this.isUserAuthenticated = !!user;
      });
  }

  ngOnDestroy(): void {
    this.userAuthSubscription.unsubscribe();
  }

}
