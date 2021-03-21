import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { RecipesComponent } from './pages/recipes.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './components/recipe-item/recipe-item.component';
import { RecipeEditComponent } from './pages/recipe-edit/recipe-edit.component';
import { NoRecipeComponent } from './pages/no-recipe/no-recipe.component';
import { RecipesRoutesModule } from './recipes-routes.module';
import { SharedModule } from '../../shared/shared.module';
import * as fromRecipes from './store/recipes.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RecipesEffects } from './store/recipes.effects';
import { RecipesApi } from './api/recipes.api';

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
    StoreModule.forFeature(fromRecipes.featureKey, fromRecipes.reducer),
    EffectsModule.forFeature([RecipesEffects]),
    SharedModule
  ],
  providers: [
    RecipesApi
  ]
})
export class RecipesModule {
}

/* A Module is a standalone unit. Therefore it needs to have everything to run on its own, that includes other Angular
 * modules, even if they are declared in AppModule, we need to declare them here, due to the module encapsulation.
 * This is done in the imports array.
 */

/* Component Declarations and @NgModule:{ exports: [...] }
 * For using a component whether for showing it on a view or in routes, we need to add it on the declarations array.
 * But if no other module either from App module or its children aren't going to use it, we don't need to export them.
 */
