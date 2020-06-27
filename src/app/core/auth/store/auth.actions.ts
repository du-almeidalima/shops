import {Action} from "@ngrx/store";
import {User} from "../user.model";
import {ResponseMessage} from "../../../shared/models/response-message.model";

export const LOGIN_START = '[Auth] Login Started';
export const SIGN_UP_START = '[Auth] Sign up Started';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';
export const LOGOUT = '[Auth] Logout';
export const AUTO_LOGIN = '[Auth] Auto Login'
export const CLEAR_ERROR = '[Auth] Clear Error';

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string, password: string }) {}
}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(public payload: {user: User, redirect: boolean}) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: ResponseMessage) {}
}

export class LogOut implements Action {
  readonly type = LOGOUT;
}

export class SignUpStart implements Action {
  readonly type = SIGN_UP_START;
  constructor(public payload: { email: string, password: string }) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions =
  | LoginStart
  | AuthenticateSuccess
  | AuthenticateFail
  | LogOut
  | SignUpStart
  | ClearError
  | AutoLogin

/*
 * The AUTHENTICATE_SUCCESS and AUTHENTICATE_FAIL actions are being used for both Sign in and Login process.
 */
