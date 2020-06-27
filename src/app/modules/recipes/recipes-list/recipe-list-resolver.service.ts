import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Store} from "@ngrx/store";
import {Actions, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {map, switchMap, take} from "rxjs/operators";
import {Recipe} from "../../../shared/models/recipe.model";
import * as fromApp from '../../../store/app.reducer';
import * as RecipesActions from '../store/recipes.actions';

@Injectable({providedIn: "root"})
export class RecipeListResolver implements Resolve<Recipe[]>{
  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {


    return this.store.select('recipes')
      .pipe(
        take(1),
        map(recipesState => recipesState.recipes),
        switchMap(recipes => {
          if (recipes.length > 0) {
            return of(recipes)
          }

          this.store.dispatch(new RecipesActions.FetchRecipes())
          return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
          )
        })
      )
  }
}

/*
 * This Resolver will call the getRecipes whenever the user tries to access the "[host]/recipes/"
 * Note that it will return a Observable<Recipe[]> but Angular will subscribe to it in its Routing process
 */
