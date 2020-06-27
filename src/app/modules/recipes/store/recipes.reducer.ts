import {Recipe} from "../../../shared/models/recipe.model";
import * as RecipesActions from './recipes.actions';

export interface RecipesState {
  recipes: Recipe[]
}

const initialState: RecipesState = {
  recipes: []
}

const recipesReducer = (state: RecipesState = initialState, action: RecipesActions.RecipesActions) => {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload
      }
    case RecipesActions.ADD_RECIPE:
      // Workaround for Generating Id's
      const biggerId = state.recipes
        .map(r => r.id)
        .reduce((lastId, rId) => {
        return lastId > rId ? lastId : rId
      }, 0)
      const newRecipe = {
        ...action.payload,
        id: biggerId + 1
      }

      return {
        ...state,
        recipes: [...state.recipes, newRecipe].sort((a, b) => a.id - b.id)
      }

    case RecipesActions.UPDATE_RECIPE:
      const recipeIndex = state.recipes.findIndex(r => r.id === action.payload.id);
      const updatedRecipes = [...state.recipes];
      updatedRecipes[recipeIndex] = action.payload;

      return {
        ...state,
        recipes: updatedRecipes
      }

    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(r => r.id !== action.payload)
      }

    default:
      return state;
  }
}

export { recipesReducer };
