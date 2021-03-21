import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectShoppingListsAndLoading } from '../store/shopping-list.reducer';
import ShoppingList from '../../../shared/models/shopping-list';
import { fetchShoppingLists } from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private selectShoppingListsAndLoadingSub: Subscription;

  shoppingLists: ShoppingList[];
  isLoading: boolean;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.selectShoppingListsAndLoadingSub = this.store.select(selectShoppingListsAndLoading)
      .subscribe(({shoppingLists, isLoading}) => {
        this.isLoading = isLoading;
        this.shoppingLists = shoppingLists;
      });

    this.store.dispatch(fetchShoppingLists());
  }

  ngOnDestroy(): void {
    if (this.selectShoppingListsAndLoadingSub) {
      this.selectShoppingListsAndLoadingSub.unsubscribe();
    }
  }
}
