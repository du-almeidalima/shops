import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Recipe } from '../../../shared/models/recipe.model';
import { environment as env } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class RecipesService {

  private readonly BASE_URL = env.api.baseURL + env.api.recipes;

  constructor(private http: HttpClient) { }

  public getRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(this.BASE_URL + '.json')
      .pipe(
        // For recipes with no Ingredients
        map((recipes: Recipe[]) => {
          if (recipes?.length > 0) {
            return recipes.map(recipe => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : []
              };
            });
          }
          return [];
        }),
      );
  }

  public saveRecipes(recipes: Recipe[]): Observable<void> {
    return this.http.put<void>(this.BASE_URL + '.json', recipes);
  }
}
