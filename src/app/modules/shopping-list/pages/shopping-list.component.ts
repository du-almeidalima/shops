import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectShoppingLists } from '../store/shopping-list.reducer';
import * as ShoppingListActions from '../store/shopping-list.actions';
import ShoppingList from '../../../shared/models/shopping-list';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  $shoppingLists: Observable<ShoppingList[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.$shoppingLists = this.store.select(selectShoppingLists);
  }

  editIngredient(index: number): void {
    this.store.dispatch(ShoppingListActions.startEdit({ index }));
  }
}
