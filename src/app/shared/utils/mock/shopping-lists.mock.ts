import ShoppingList from '../../models/shopping-list';

const SHOPPING_LIST_MOCK: ShoppingList[] = [
  {
    title: 'Shopping List Title 1',
    items: [
      { name: 'Apple', amount: 3 },
      { name: 'Orange', amount: 1 },
      { name: 'Rice', amount: 2 }
    ],
    createdOn: new Date()
  },
  {
    title: 'Shopping List With A Really Extra Long Title 2',
    items: [
      { name: 'Apple', amount: 3 },
      { name: 'Orange', amount: 1 },
      { name: 'Beans', amount: 7 },
      { name: 'Rice', amount: 2 },
      { name: 'Corn', amount: 10 },
      { name: 'Flour', amount: 3 },
      { name: 'Popcorn', amount: 1 },
      { name: 'Bread', amount: 7 },
      { name: 'Apple Juice', amount: 2 },
      { name: 'Lemon', amount: 10 },
      { name: 'Rice', amount: 2 },
      { name: 'Corn', amount: 10 },
      { name: 'Flour', amount: 3 },
      { name: 'Popcorn', amount: 1 },
      { name: 'Bread', amount: 7 },
      { name: 'Apple Juice', amount: 2 },
      { name: 'Lemon', amount: 10 },
      { name: 'Popcorn', amount: 1 },
      { name: 'Bread', amount: 7 },
      { name: 'Apple Juice', amount: 2 },
      { name: 'Lemon', amount: 10 },
      { name: 'Rice', amount: 2 },
      { name: 'Corn', amount: 10 },
      { name: 'Flour', amount: 3 },
      { name: 'Popcorn', amount: 1 },
      { name: 'Bread', amount: 7 },
      { name: 'Apple Juice', amount: 2 },
      { name: 'Lemon', amount: 10 },
    ],
    createdOn: new Date()
  },
  {
    title: 'Shopping List Title 3',
    items: [
      { name: 'Apple', amount: 3 },
      { name: 'Orange', amount: 1 },
      { name: 'Rice', amount: 2 },
      { name: 'Meat', amount: 6 },
    ],
    createdOn: new Date()
  },
  {
    title: 'Shopping List Title 4',
    items: [
      { name: 'Apple', amount: 3 },
      { name: 'Orange', amount: 1 },
      { name: 'Rice', amount: 2 }
    ],
    createdOn: new Date()
  },
];

export default SHOPPING_LIST_MOCK;
