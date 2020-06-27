import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from "@ngrx/store";
import {map, switchMap} from "rxjs/operators";

import {Recipe} from '../../../shared/models/recipe.model';
import * as fromApp from '../../../store/app.reducer';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as RecipeActions from '../store/recipes.actions';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  // Properties
  public selectedRecipe: Recipe;

  constructor(private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // For changes in the current component
    this.route.params
      .pipe(
        map((params: Params) => {
          return +params.id
        }),
        switchMap(id => {
          return this.store.select('recipes')
            .pipe(
              map(recipesState => recipesState.recipes.find(r => r.id === id))
            )
        })
      )
      .subscribe(recipe => {
        this.selectedRecipe = recipe
      })
  }

  // Methods
  public onSendToShoppingList(): void {
    // this.shoppingListService.addIngredients(this.selectedRecipe.ingredients);
    const action = ShoppingListActions.addIngredients({ ingredients: this.selectedRecipe.ingredients });
    this.store.dispatch(action);
  }

  // This method is just for demonstrating the approach for navigating programmatically, usually you'd use:
  // - routerLink to navigate on click
  // - programmatically navigation to execute some logic before doing so
  // - resolvers to fetch data that te component being loaded will need
  public onEditRecipe(): void {
    // this.route = <domain>/recipes/edit/2
    // this.store.dispatch()
    this.router.navigate(['../', this.selectedRecipe.id, 'edit'], {relativeTo: this.route});
  }

  public onRemoveRecipe(): void {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.selectedRecipe.id))
    this.router.navigate(['recipes']);
  }

}
