import { Ingredient } from './ingredient.model';

export default interface ShoppingList {
  title: string;
  items: Ingredient[];
  createdOn: Date;
  updatedOn?: Date;
}
