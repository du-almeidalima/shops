import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Store} from "@ngrx/store";

import {Observable} from "rxjs";
import {exhaustMap, map, take} from "rxjs/operators";

import * as fromApp from '../../store/app.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth')
      .pipe(
        take(1),
        map(authState => {
          return authState.user
        }),
        // Swapping the userAuthObservable for the request Observable
        exhaustMap(user => {
          // Checking the user has already logged in
          if (!user){
            return next.handle(req);
          }
          const requestWithToken = req.clone({
            params: new HttpParams().set('auth', user.token)
          });
          return next.handle(requestWithToken);
        })
      );
  }
}
