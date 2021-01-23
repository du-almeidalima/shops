import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShoppingListRoutesModule } from './shopping-list-routes.module';
import { ShoppingListComponent } from './pages/shopping-list.component';
import { ShoppingEditComponent } from './components/shopping-edit/shopping-edit.component';
import { StoreModule } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShoppingListRoutesModule,
    StoreModule.forFeature(fromShoppingList.featureKey, fromShoppingList.reducer)
  ]
})
export class ShoppingListModule {
}
