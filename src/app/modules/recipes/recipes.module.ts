import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

import {RecipesComponent} from "./recipes.component";
import {RecipesListComponent} from "./recipes-list/recipes-list.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeItemComponent} from "./recipes-list/recipe-item/recipe-item.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {NoRecipeComponent} from "./no-recipe/no-recipe.component";
import {RecipesRoutesModule} from "./recipes-routes.module";

import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    NoRecipeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutesModule,
    SharedModule
  ],
  exports: []
})
export class RecipesModule {}

/* A Module is a standalone unit. Therefore it needs to have everything to run on its own, that includes other Angular
 * modules, even if they are declared in AppModule, we need to declare them here, due to the module encapsulation.
 * This is done in the imports array.
 */

/* Component Declarations and @NgModule:{ exports: [...] }
 * For using a component whether for showing it on a view or in routes, we need to add it on the declarations array.
 * But if no other module either from App module or its children aren't going to use it, we don't need to export them.
 */
