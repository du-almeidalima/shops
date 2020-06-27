export class Ingredient {
  constructor(public name: string, public amount: number){};
}

/** Since ingredient will be used in both Shopping List and Recipes we'll create a folder called "shared" to hold it
 *
 * Using TypeScript property to create classes without needing to declaring constructor and properties.
 * The above class is the same as this
 * export class Ingredient {
  public name : string;
  public amount : number;

  constructor(name:string, amount: number){
    this.name = name;
    this.amount = amount;
  }
}
 */
