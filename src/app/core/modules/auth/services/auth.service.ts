import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthResponseData } from '../../../../shared/models/firebase/response-data.model';
import { environment as env } from '../../../../../environments/environment';
import * as AuthActions from '../store/auth.actions';
import { User } from '../../../../shared/models/user.model';


@Injectable()
export class AuthService {
  private readonly SIGN_IN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  private readonly SIGN_UP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
  private readonly LS_USER_KEY = 'userData';

  private tokenExpirationTimer: any;

  constructor(private store: Store, private http: HttpClient) {
  }

  public authenticate(email: string, password: string, authType: 'SIGN_IN' | 'SIGN_UP'): Observable<any> {
    const authUrl = authType === 'SIGN_UP' ? this.SIGN_IN_URL : this.SIGN_UP_URL;
    return this.http
      .post<AuthResponseData>(authUrl,
        {
          email,
          password,
          returnSecureToken: true
        },
        {
          params: new HttpParams().set('key', env.firebaseAPIKey)
        }
      );
  }

  public getAuthUserFromLocalStorage(): any {
    return JSON.parse(localStorage.getItem(this.LS_USER_KEY));
  }

  public setAuthUserToLocalStorage(user: User): void {
    localStorage.setItem(this.LS_USER_KEY, JSON.stringify(user));
  }

  public logout(): void {
    this.clearLogoutTimer();
    localStorage.removeItem(this.LS_USER_KEY);
  }

  public setLogoutTimer(expirationDuration: number): void {
    console.log(`Session expires in: ${((expirationDuration / 1000) / 60).toFixed(0)} minutes`);
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(AuthActions.logout());
    }, expirationDuration);
  }

  private clearLogoutTimer(): void {
    clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }
}
