import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { authSelector } from '../modules/auth/store/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(authSelector)
      .pipe(
        take(1),
        map(authState => {
          return !!authState.user;
        })
      );
  }
}
