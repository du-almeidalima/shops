import { createAction, props } from '@ngrx/store';
import { User } from '../../../../shared/models/user.model';
import { ResponseMessage } from '../../../../shared/models/response-message.model';

export const authStart = createAction(
  '[Auth] Login Started',
  props<{ email: string, password: string, authType: 'SIGN_IN' | 'SIGN_UP' }>()
);
export const authenticationSuccess = createAction('[Auth] Authentication Success', props<{ user: User, redirect: boolean }>());
export const authenticationFail = createAction('[Auth] Authentication Fail', props<ResponseMessage>());
export const logout = createAction('[Auth] Logout');
export const autoLogin = createAction('[Auth] Auto Login');
export const clearError = createAction('[Auth] Clear Error');
