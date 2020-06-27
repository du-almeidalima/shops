import {User} from '../user.model';
import {ResponseMessage} from "../../../shared/models/response-message.model";
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User,
  authError: ResponseMessage,
  isLoading: boolean
}

const initialState: AuthState = {
  user: null,
  authError: null,
  isLoading: false
}

const authReducer = (state: AuthState = initialState, action: AuthActions.AuthActions) => {
  switch (action.type) {
    case AuthActions.LOGIN_START:
    case AuthActions.SIGN_UP_START:
      return {
        ...state,
        user: null,
        authError: null,
        isLoading: true
      }

    case AuthActions.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        authError: null,
        isLoading: false
      };

    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        isLoading: false
      }

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        authError: null,
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      }

    default:
      return state;
  }
}

export { authReducer };
