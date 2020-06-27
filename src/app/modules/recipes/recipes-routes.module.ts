import {NgModule} from "@angular/core";
import {RecipesComponent} from "./recipes.component";
import {AuthGuard} from "../../core/auth/auth.guard";
import {NoRecipeComponent} from "./no-recipe/no-recipe.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeListResolver} from "./recipes-list/recipe-list-resolver.service";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RouterModule, Routes} from "@angular/router";

const RECIPES_ROUTES: Routes = [
  { path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
      { path: '', component: NoRecipeComponent },
      // We'll use the same component to create and edit a Recipe
      { path: 'create', component: RecipeEditComponent },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeListResolver] },
      // It's important to leave the routes with dynamic values to last, otherwise Angular will try to parse other
      // paths into this value e.g. "create" would become the id
      // { path: ':id', component: RecipeDetailComponent, resolve: { recipe: RecipeResolver } },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipeListResolver]}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(RECIPES_ROUTES)],
  exports: [RouterModule]
})
export class RecipesRoutesModule {

}

/*
 * We can improve our Routes by taking the routes related to a particular module from app-routes.module and creating
 * the module own routes.
 * To do so, in our recipe.module.ts we use the RouterModule.forChild
 * OBS: The .forRoot is used essentially once and for every feature module we want to import we use the .forChild
 */

/*
 * Lazing Loading
 * The first step to implement Lazy Loading, is to split our App into Feature Modules.
 * Once it's done, we can take the root path, in this case was 'recipes':
 *  - { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [ ... ] }
 * And change to
 *  - { path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [ ... ] }
 * This was done because the 'recipe' path is now included in the app.routes-module
 *
 * The rest of implementation goes into the main routing module (RoutesModule.forRoot()), in this case app.routes-module
 */
