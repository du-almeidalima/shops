import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ShoppingListRoutesModule} from './shopping-list-routes.module';
import {ShoppingListComponent} from './pages/shopping-list.component';
import {ShoppingEditComponent} from './components/shopping-edit/shopping-edit.component';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShoppingListRoutesModule
  ]
})
export class ShoppingListModule {}
