import {Component, OnDestroy, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";

import {Subscription} from "rxjs";
import {map} from "rxjs/operators";

import {User} from "../auth/user.model";
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../../modules/recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  private userAuthSubscription: Subscription;
  public isUserAuthenticated = false;

  constructor(private store: Store<fromApp.AppState>) {}

  public onSaveData(): void {
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  public onFetchData(): void {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  public onLogOut(): void {
    this.store.dispatch(new AuthActions.LogOut())
  }

  ngOnInit(): void {
    this.userAuthSubscription = this.store.select('auth')
      .pipe( map(authState => authState.user))
      .subscribe((user: User) => {
        // user ? true : false
        this.isUserAuthenticated = !!user;
      })
  }

  ngOnDestroy(): void {
    this.userAuthSubscription.unsubscribe();
  }

}
