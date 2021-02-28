import { Component, Input, OnInit } from '@angular/core';
import ShoppingList from '../../../../shared/models/shopping-list';
import { Ingredient } from '../../../../shared/models/ingredient.model';

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

  constructor() { }

  private getItemsSummary = (items: Ingredient[]): string => {
    let itemsSummary = '';

    for (let i = 0; i < items.length; i++) {
      if (itemsSummary.length > 140) {
        itemsSummary = itemsSummary.concat(' ...');
        break;
      }

      itemsSummary = itemsSummary.concat(`${i !== 0 ? ',' : ''} ${items[i].amount} ${items[i].name}`);
    }

    return itemsSummary;
  }

  ngOnInit(): void {
    this.amount = this.shoppingList.items.reduce((acc, cur) => acc + cur.amount, 0);
    this.itemsSummary = this.getItemsSummary(this.shoppingList.items);
  }
}
