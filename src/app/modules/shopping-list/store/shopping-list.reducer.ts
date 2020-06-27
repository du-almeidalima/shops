import {Action, createReducer, on} from "@ngrx/store";

import { Ingredient } from "../../../shared/models/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

/* State Structure */
export interface ShoppingListState {
  ingredients: Ingredient[],
  editedIngredient: Ingredient,
  editedIngredientIndex: number
}
/* The initial state of this feature */
const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient('Tomato', 4),
    new Ingredient('Onion', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

/**
 * The reducer will map the action.type and return a new copy of the state with the action specific alterations.
 * each "on" function will be the "case" of the old logic with switch statements. They will accept the same, the state
 * and the action coming from the "createAction".
 * @param state Current State
 * @param {Action} action The action type and the payload
 * @see {@link ShoppingListActions}
 */

const shoppingListReducer = createReducer<ShoppingListState, Action>(
  initialState,
  on(ShoppingListActions.addIngredient, (state, { ingredient }) =>
    ({...state, ingredients: [...state.ingredients, ingredient]})
  ),
  on(ShoppingListActions.addIngredients, (state, { ingredients }) =>
    ({...state, ingredients: [...state.ingredients, ...ingredients]})
  ),
  on(ShoppingListActions.updateIngredient, (state, { ingredient }) => {
      const updatedIngredients = [ ...state.ingredients ];
      updatedIngredients[state.editedIngredientIndex] = ingredient;

      return { ...state, ingredients: updatedIngredients }
    }
  ),
  on(ShoppingListActions.removeIngredient, state => {
    return {
      ...state,
      ingredients: [ ...state.ingredients.filter((ig, igIndex) => igIndex !== state.editedIngredientIndex)],
      editedIngredientIndex: -1,
      editedIngredient: null
    }
  }),
  on(ShoppingListActions.startEdit, (state, { index }) => {
    return {
      ...state,
      editedIngredient: { ...state.ingredients[index] },
      editedIngredientIndex: index
    }
  }),
  on(ShoppingListActions.stopEdit, state => ({ ...state, editedIngredient: null, editedIngredientIndex: -1}))
)


export { shoppingListReducer };

/*
 * The reducer is a function that will take the state and the action to perform the change on the application state.
 * In ngRx Redux Reducer. This function will be called the NgRx package and this will pass 2 arguments to this func:
 * - state: The current state before it was change, it can also receive a initial state as default value
 * - action: The action that will be performed
 */

/*
 * Since we're mapping the Actions.type with strings and this is pretty easier to get wrong, the actions file was
 * created to standardize it.
 *
 * The Action interface just have the "type" property, to add another property, like payload, we can create a class that
 * implements this interface and have another property. After doing this we can use our new "Action" type in the reducer
 */

/*
 * Due to the need of having to specify how the state looks like when injecting the Store into components, a interface
 * can be created describing it.
 */
