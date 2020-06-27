import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShoppingListComponent} from "./shopping-list.component";

const SHOPPING_LIST_ROUTES: Routes = [
  { path: '', component: ShoppingListComponent}
]

@NgModule({
  imports: [RouterModule.forChild(SHOPPING_LIST_ROUTES)],
  exports: [RouterModule]
})
export class ShoppingListRoutesModule {

}

/*
 * Lazing Loading
 * The first step to implement Lazy Loading, is to split our App into Feature Modules.
 * Once it's done, we can take the root path, in this case was 'shopping-list':
 *  - { path: 'shopping-list', component: ShoppingListComponent}
 * And change to
 *  - { path: '', component: ShoppingListComponent}
 * This was done because the 'shopping-list' path is now included in the app.routes-module
 *
 * The rest of implementation goes into the main routing module (RoutesModule.forRoot()), in this case app.routes-module
 */
