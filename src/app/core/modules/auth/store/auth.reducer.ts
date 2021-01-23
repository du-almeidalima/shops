import { User } from '../../../../shared/models/user.model';
import { ResponseMessage } from '../../../../shared/models/response-message.model';
import * as AuthActions from './auth.actions';
import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';

export const featureKey = 'auth';

export interface AuthState {
  user: User;
  authError: ResponseMessage;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  authError: null,
  isLoading: false
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.authStart, (state) => ({ ...state, user: null, authError: null, isLoading: true })),
  on(AuthActions.authenticationSuccess, (state, { user }) => ({ ...state, user, authError: null, isLoading: false })),
  on(AuthActions.authenticationFail, (state, authError) => ({ ...state, user: null, authError, isLoading: false })),
  on(AuthActions.logout, (state) => ({ ...state, user: null, authError: null })),
  on(AuthActions.clearError, (state) => ({ ...state, authError: null })),
);

export function reducer(state: AuthState, action: Action): AuthState {
  return authReducer(state, action);
}

export const authSelector = createFeatureSelector<AuthState>(featureKey);
