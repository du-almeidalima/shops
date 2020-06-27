import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions'


@Injectable({providedIn: "root"})
export class AuthService {
  private tokenExpirationTimer: any;

  constructor ( private store: Store<fromApp.AppState> ) {}

  public setLogoutTimer(expirationDuration: number): void {
    console.info(`Session expires in: ${((expirationDuration / 1000) / 60).toFixed(0)} minutes`);
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.LogOut());
    }, expirationDuration);
  }

  public clearLogoutTimer(): void {
    clearTimeout(this.tokenExpirationTimer)
    this.tokenExpirationTimer = null;
  }
}
