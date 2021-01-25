import { Recipe } from '../../../shared/models/recipe.model';
import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as RecipesActions from './recipes.actions';

export const featureKey = 'recipes';

export interface RecipesState {
  recipes: Recipe[];
}

const initialState: RecipesState = {
  recipes: []
};

const addRecipe = (recipe: Recipe, recipes: Recipe[]): Recipe[] => {
  // Workaround for Generating Id's
  const largestId = recipes
    .map(r => r.id)
    .reduce((lastId, rId) => {
      return lastId > rId ? lastId : rId;
    }, 0);

  const newRecipe = {
    ...recipe,
    id: largestId + 1
  };

  return [...recipes, newRecipe].sort((a, b) => a.id - b.id);
};

const updateRecipe = (recipe: Recipe, recipes: Recipe[]) => {
  const recipeIndex = recipes.findIndex(r => r.id === recipe.id);
  const updatedRecipes = [...recipes];
  updatedRecipes[recipeIndex] = recipe;

  return updatedRecipes;
};

const deleteRecipe = (id: number, recipes: Recipe[]) => {
  return recipes.filter(r => r.id !== id);
};

const recipesReducer = createReducer(
  initialState,
  on(RecipesActions.setRecipes, (state, { recipes }) => ({ ...state, recipes })),
  on(RecipesActions.addRecipe, (state, { recipe }) => ({ ...state, recipes:  addRecipe(recipe, state.recipes)})),
  on(RecipesActions.updateRecipe, (state, { recipe }) => ({ ...state, recipes:  updateRecipe(recipe, state.recipes)})),
  on(RecipesActions.deleteRecipe, (state, { id }) => ({ ...state, recipes:  deleteRecipe(id, state.recipes)})),
);

export const reducer = (state: RecipesState, action: Action): RecipesState => {
  return recipesReducer(state, action);
};

export const recipesSelector = createFeatureSelector<RecipesState>(featureKey);
