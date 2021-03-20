import { Component, Input, OnInit } from '@angular/core';
import ShoppingList from '../../../../shared/models/shopping-list';

@Component({
  selector: 'app-shopping-list-card',
  templateUrl: './shopping-list-card.component.html',
  styleUrls: ['./shopping-list-card.component.scss']
})
export class ShoppingListCardComponent implements OnInit {

  @Input()
  readonly shoppingList: ShoppingList;

  amount: number;
  itemsSummary: string;

  ngOnInit(): void {
    this.amount = this.shoppingList.items.reduce((acc, cur) => acc + cur.amount, 0);
    this.itemsSummary = this.shoppingList.items.reduce((acc, curr, i) => {
      return i >= this.shoppingList.items.length
        ? `${acc} ${curr.amount} ${curr.name}`
        : `${acc} ${curr.amount} ${curr.name},`;
    }, '');
  }
}
