import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import * as fromRecipes from '../store/recipes.reducer';
import * as RecipesActions from '../store/recipes.actions';

@Injectable({providedIn: 'root'})
export class RecipeListResolver implements Resolve<void>{
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {

    // Checks if there is already recipes loaded, if not it dispatch an action to fetch and return the recipes
    this.store.select(fromRecipes.recipesSelector)
      .pipe(
        take(1),
        map(recipesState => recipesState.recipes),
        switchMap(recipes => {
          if (recipes.length > 0) {
            return of(recipes);
          }

          // Fetching new Recipes
          this.store.dispatch(RecipesActions.fetchRecipes());
        })
      );
  }
}

/*
 * This Resolver will call the getRecipes whenever the user tries to access the "[host]/recipes/"
 * Note that it will return a Observable<Recipe[]> but Angular will subscribe to it in its Routing process
 */
