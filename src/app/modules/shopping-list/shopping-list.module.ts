import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShoppingListRoutesModule } from './shopping-list-routes.module';
import { ShoppingListComponent } from './pages/shopping-list.component';
import { ShoppingEditComponent } from './components/shopping-edit/shopping-edit.component';
import { StoreModule } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import { SharedModule } from '../../shared/shared.module';
import { ShoppingListCardComponent } from './components/shopping-list-card/shopping-list-card.component';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
    ShoppingListCardComponent
  ],
  imports: [
    FormsModule,
    ShoppingListRoutesModule,
    StoreModule.forFeature(fromShoppingList.featureKey, fromShoppingList.reducer),
    SharedModule
  ]
})
export class ShoppingListModule {
}
