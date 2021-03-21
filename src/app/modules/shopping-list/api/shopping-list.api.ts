import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '../../../../environments/environment';
import ShoppingList from '../../../shared/models/shopping-list';

@Injectable({ providedIn: 'root' })
export class ShoppingListApi {

  private readonly BASE_URL = env.api.baseURL + env.api.shoppingLists;

  constructor(private http: HttpClient) {
  }

  public getShoppingLists(userUID: string): Observable<ShoppingList[]> {
    return this.http
      .get<ShoppingList[]>(`${this.BASE_URL}/${userUID}.json`)
      .pipe();
  }
}
