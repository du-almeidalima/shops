import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from "rxjs";

import {environment as env} from "../../../../environments/environment";
import {User} from "../user.model";
import {MessageMapper} from "../../../shared/utils/message-mapper";
import {MessageStatus} from "../../../shared/enums/message-status.enum";
import {AuthResponseData} from "../../../shared/models/firebase/response-data.model";
import * as AuthActions from './auth.actions';
import {AuthService} from "../auth.service";

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
  private readonly SIGN_IN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  private readonly LOGIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
  private readonly LS_USER_KEY = 'userData';

  constructor (
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  @Effect()
  authLoginStart = this.actions$.pipe(
    // What Action(ons) type will this Observable reacting
    ofType(AuthActions.LOGIN_START),
    // Taking the Action Observable and mapping it to a new Observable
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(this.LOGIN_URL,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          },
          {
            params: new HttpParams().set('key', env.firebaseAPIKey)
          }
        ).pipe(
          map((resData: AuthResponseData) => {
            // Creating a new action based on the return from the last Observable
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            return handleAuthentication.call(this, resData);
          }),
          catchError((errData: HttpErrorResponse) => {
            // Creating a new action based on the return from the last Observable
            return of(handleErrorAuthentication(errData));
          })
        )
    })
  );

  @Effect()
  authSignUpStart = this.actions$.pipe(
    ofType(AuthActions.SIGN_UP_START),
    switchMap((authData: AuthActions.SignUpStart) => {
      return this.http
        .post<AuthResponseData>(this.SIGN_IN_URL,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          },
          {
            params: new HttpParams().set('key', env.firebaseAPIKey)
          }
        ).pipe(
          map((resData: AuthResponseData) => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            return handleAuthentication.call(this, resData);
          }),
          catchError((errData: HttpErrorResponse) => {
            return of(handleErrorAuthentication(errData));
          })
        )
    })
  )

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
    tap((authData: AuthActions.AuthActions) => {
      if ((authData instanceof AuthActions.AuthenticateSuccess) && (authData.payload.redirect)) {
        this.router.navigate(['/home']);
      }
    })
  )

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem(this.LS_USER_KEY)
    })
  )

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const restoredUser = JSON.parse(localStorage.getItem('userData'));
      if (restoredUser){
        const {email, id, _token, _tokenExpirationDate} = restoredUser;
        const user = new User(email, id, _token, new Date(_tokenExpirationDate));

        // Checking if token is still valid (check User class)
        if (user.token){
          const expirationDuration = (new Date(_tokenExpirationDate).getTime() - new Date().getTime());
          // Starting Session countdown
          this.authService.setLogoutTimer(expirationDuration);

          return new AuthActions.AuthenticateSuccess({ user: user, redirect: false });
        } else {
          console.info(`User token has expired.`);
          return { type: 'NULL' }
        }
      } else {
        console.info(`Couldn't find any user to auto login.`);
        return { type: 'NULL' }
      }
    })
  )
}

/* HELPER FUNCTIONS */

function handleAuthentication(resData: AuthResponseData): AuthActions.AuthActions {
    const expirationDate = new Date().getTime() + (+resData.expiresIn * 1000);
    const user = new User(resData.email, resData.localId, resData.idToken, new Date(expirationDate));
    // Storing user for Auto login feature
    localStorage.setItem(this.LS_USER_KEY, JSON.stringify(user));

    return new AuthActions.AuthenticateSuccess({ user: user, redirect: true });
  }

function handleErrorAuthentication(errData: HttpErrorResponse): AuthActions.AuthActions {
  const errorCode = errData?.error?.error?.message;
  const responseMessage = errorCode
    ? MessageMapper.mapMessage(errorCode)
    : { message: 'A different error message format was received from API', status: MessageStatus.ERROR }

  return new AuthActions.AuthenticateFail(responseMessage)
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
