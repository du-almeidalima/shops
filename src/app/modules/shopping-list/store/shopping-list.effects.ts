import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { ShoppingListApi } from '../api/shopping-list.api';
import * as ShoppingListActions from './shopping-list.actions';
import { selectUserUID } from '../../../core/modules/auth/store/auth.reducer';

@Injectable()
export class ShoppingListEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private shoppingListApi: ShoppingListApi
  ) {
  }

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(ShoppingListActions.fetchShoppingLists),
    withLatestFrom(this.store.select(selectUserUID)),
    switchMap(([_, userUID]) => {
      return this.shoppingListApi
        .getShoppingLists(userUID)
        .pipe(
          map(shoppingLists => {
            return ShoppingListActions.setShoppingLists({ shoppingLists });
          })
        );
    })
  );
}
