import { ActionReducerMap } from '@ngrx/store';

import * as fromRecipes from '../modules/recipes/store/recipes.reducer';
// import * as fromAuth from '../modules/auth/store/auth.reducer';

/* Global application state structure */
export interface AppState {
  recipes: fromRecipes.RecipesState;
}

/* Global application reducers */
export const reducers: ActionReducerMap<any> = {
  recipes: fromRecipes.recipesReducer,
};

/*
 * The AppState interface will define how the application state will look like, this is useful for when we inject the
 * store into components and services and need to them, via generic, how the store is supposed to be structured
 *  - constructor(private store: Store<fromApp.AppState>) { }
 *
 * The reducers is an Map were we can tell the NgRx Store what reducers our application will use, so whenever an action
 * is dispatched, they will go through them. This Map is passed as parameter when building up the StoreModule in
 * AppModule
 *  - StoreModule.forRoot(fromApp.reducers)
 */
