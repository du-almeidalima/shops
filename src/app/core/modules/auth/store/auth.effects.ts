import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';

import { User } from '../../../../shared/models/user.model';
import { MessageMapper } from '../../../../shared/utils/message-mapper';
import { MessageStatus } from '../../../../shared/enums/message-status.enum';
import { AuthResponseData } from '../../../../shared/models/firebase/response-data.model';
import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
import { Action } from '@ngrx/store';

/**
 * @author Eduardo Lima
 *
 * @description NgRx Effect Class responsible for mapping effects from User Authentication actions.
 * it communicates with FireBase Authentication API and uses the {@link MessageMapper} to parse the message code
 * form Firebase into User friendly message.
 *
 * @see {@link MessageMapper}
 * @see [Firebase REST Authentication API]{@link https://firebase.google.com/docs/reference/rest/auth#section-create-email-password}
 */
@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
  }

  @Effect()
  authLoginStart = this.actions$.pipe(
    ofType(AuthActions.authStart),
    switchMap(({ email, password, authType }) => {
        return this.authService.authenticate(email, password, authType)
        .pipe(
          map((resData: AuthResponseData) => {
            // Creating a new action based on the return from the last Observable
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            return handleAuthentication.call(this, resData);
          }),
          catchError((errData: HttpErrorResponse) => {
            // Creating a new action based on the return from the last Observable
            return of(handleErrorAuthentication(errData));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.authenticationSuccess),
    tap(({ redirect }) => {
      if (redirect) {
        this.router.navigate(['/home']);
      }
    })
  );

  @Effect({ dispatch: false })
  logoutRedirect = this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => {
      this.authService.logout();
      this.router.navigate(['/home']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.autoLogin),
    map(() => {
      const restoredUser = this.authService.getAuthUserFromLocalStorage();
      if (restoredUser) {
        const { email, id, _token, _tokenExpirationDate } = restoredUser;
        const user = new User(email, id, _token, new Date(_tokenExpirationDate));

        // Checking if token is still valid (check User class)
        if (user.token) {
          const expirationDuration = (new Date(_tokenExpirationDate).getTime() - new Date().getTime());
          // Starting Session countdown
          this.authService.setLogoutTimer(expirationDuration);

          return AuthActions.authenticationSuccess({ user, redirect: false });
        } else {
          console.log(`User token has expired.`);
          return { type: 'NULL' };
        }
      } else {
        console.log(`Couldn't find any user to auto login.`);
        return { type: 'NULL' };
      }
    })
  );
}

/* HELPER FUNCTIONS */

function handleAuthentication(resData: AuthResponseData): Action {
  const expirationDate = new Date().getTime() + (+resData.expiresIn * 1000);
  const user = new User(resData.email, resData.localId, resData.idToken, new Date(expirationDate));
  this.authService.setAuthUserToLocalStorage(user);

  return AuthActions.authenticationSuccess({ user, redirect: true });
}

function handleErrorAuthentication(errData: HttpErrorResponse): Action {
  const errorCode = errData?.error?.error?.message;
  const responseMessage = errorCode
    ? MessageMapper.mapMessage(errorCode)
    : { message: 'A different error message format was received from API', status: MessageStatus.ERROR };

  return AuthActions.authenticationFail(responseMessage);
}


/*
 * Effects are an RxJS powered side effect model for Store. Effects use streams to provide new sources of actions to reduce
 * state based on external interactions such as network requests, web socket messages and time-based events.
 *
 * In a service-based Angular application, components are responsible for interacting with external resources directly
 * through services. Instead, effects provide a way to interact with those services and isolate them from the
 * components.
 * Effects are where you handle tasks such as fetching data, long-running tasks that produce multiple events, and other
 * external interactions where your components don't need explicit knowledge of these interactions.
 */

/*
 * In my words: Actions are a big Observable that will be notified whenever a action is dispatched in the App, but what
 * makes it different from the reduce is that we don't change the State, so an action is something we need to do in our
 * app, HTTP Calls, Websocket... But it doesn't interfere the state. After this code is done, we can dispatch a new
 * Action.
 * Also, the effect for AuthActions.AUTHENTICATE_SUCCESS is firstly captured in AuthReducer and then in AuthEffects.
 * OBS: It's not needed to call subscribe on a Action, NgRx does it already.
 */

/*
 * Creating new Observables for responses
 * The Actions is a Stream of Observables of any Action our app receives, so it can never die!
 * That being said, any observable returned from it can't be a error Observable that would shut the Stream. So we can't
 * use the catchError() Observable in the outer flow, because this would shut the Actions Observable.
 */

/*
 * After finishing the request
 * So a Effect generally dispatch an Action when it's done. By annotating our method with @Effect it'll automatically
 * dispatch a new Action coming from the result Observable1
 */

/*
 * To plug this Effect class into our application, we need to do something similar to the StoreModule,
 * We need to add it into our main Module.
 */
