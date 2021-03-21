import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { RecipesApi } from '../api/recipes.api';
import * as RecipesActions from './recipes.actions';
import * as fromRecipes from './recipes.reducer';

@Injectable()
export class RecipesEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private recipesService: RecipesApi
  ) {
  }

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.fetchRecipes),
    switchMap(() => {
      return this.recipesService
        .getRecipes()
        .pipe(
          map(recipes => {
            return RecipesActions.setRecipes({ recipes });
          })
        );
    })
  );

  @Effect({ dispatch: false })
  redirectToRecipe = this.actions$.pipe(
    ofType(RecipesActions.storeRecipes),
    // Merges the values of a Observable into another
    withLatestFrom(this.store.select(fromRecipes.recipesSelector)),
    switchMap(([_, recipesState]) => {
      return this.recipesService.saveRecipes(recipesState.recipes);
    })
  );
}
