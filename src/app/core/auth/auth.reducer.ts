import { AuthState } from './auth.models';
import { AuthActions, AuthActionTypes } from './auth.actions';

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
  loading: false,
  isLoaded: false
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {

  switch (action.type) {

    case AuthActionTypes.LOGIN:
      return { ...state, loading: true };

    case AuthActionTypes.LOGOUT:
      return { ...state, isAuthenticated: false };

    case AuthActionTypes.LOGIN_SUCCESS:
      let payload = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: payload.access_token,
          email: payload.email || ''
        },
        loading: false
      };

    case AuthActionTypes.VALIDATE_TOKEN_SUCCESS: {
      let payload = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: payload.access_token,
          email: payload.email || ''
        },
        loading: false
      };
    }

    case AuthActionTypes.LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: 'Incorrect email and/or password.',
        loading: false
      };

    case AuthActionTypes.GET_USER: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: true,
        isLoaded: false
      };
    }

    case AuthActionTypes.GET_USER_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        isLoaded: true
      };
    }

    case AuthActionTypes.GET_USER_FAIL: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        isLoaded: true
      };
    }

    default:
      return state;
  }

}
