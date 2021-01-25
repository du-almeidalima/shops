import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../../../shared/models/recipe.model';
import { environment as env } from '../../../../environments/environment';
import * as RecipesActions from './recipes.actions';
import * as fromRecipes from './recipes.reducer';

@Injectable()
export class RecipesEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store
  ) { }

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.fetchRecipes),
    switchMap(() => {
      return this.http
        .get<Recipe[]>(env.recipesAPI + '.json')
        .pipe(
          // For recipes with no Ingredients
          map((recipes: Recipe[]) => {
            console.log(recipes);
            if (recipes?.length > 0) {
              return recipes.map(recipe => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : []
                };
              });
            }
            return [];
          }),
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
      return this.http.put(env.recipesAPI + '.json', recipesState.recipes);
    })
  );
}
