import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {map, switchMap, withLatestFrom} from "rxjs/operators";
import {Recipe} from "../../../shared/models/recipe.model";
import {environment as env} from "../../../../environments/environment";
import * as RecipesActions from './recipes.actions';
import * as fromApp from '../../../store/app.reducer';

@Injectable()
export class RecipesEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>) { }

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http
        .get<Recipe[]>(env.recipesAPI + '.json')
        .pipe(
          // For recipes with no Ingredients
          map((recipes: Recipe[]) => {
            console.log(recipes)
            if (recipes?.length > 0){
              return recipes.map(recipe => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : []
                }
              })
            }
            return [];
          }),
          map(recipes => {
            return new RecipesActions.SetRecipes(recipes)
          })
        )
    })
  )

  @Effect({dispatch: false})
  redirectToRecipe = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    // Merges the values of a Observable into another
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put(env.recipesAPI + '.json', recipesState.recipes)
    })
  )
}
