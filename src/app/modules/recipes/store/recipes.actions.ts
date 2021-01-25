import { createAction, props } from '@ngrx/store';
import { Recipe } from '../../../shared/models/recipe.model';

export const setRecipes = createAction('[Recipes] Set Recipes', props<{ recipes: Recipe[] }>());
export const fetchRecipes = createAction('[Recipes] Fetch Recipes');
export const addRecipe = createAction('[Recipes] Add Recipe', props<{ recipe }>());
export const updateRecipe = createAction('[Recipes] Update Recipe', props<{ recipe }>());
export const deleteRecipe = createAction('[Recipes] Delete Recipe', props<{ id: number }>());
export const storeRecipes = createAction('[Recipes] Store Recipes');
