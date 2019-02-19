import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '@app/core/auth/user';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAIL = '[Auth] Login Fail',
  LOGOUT = '[Auth] Logout',
  GET_USER = '[Auth] GET_USER',
  GET_USER_SUCCESS = '[Auth] GET_USER_SUCCESS',
  GET_USER_FAIL = '[Auth] GET_USER_FAIL',

  CHANGE_PASSWORD = '[Auth] CHANGE_PASSWORD',
  CHANGE_PASSWORD_SUCCESS = '[Auth] CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAIL = '[Auth] CHANGE_PASSWORD_FAIL',

  VALIDATE_TOKEN = '[Auth] VALIDATE_TOKEN',
  VALIDATE_TOKEN_SUCCESS = '[Auth] VALIDATE_TOKEN_SUCCESS',
  VALIDATE_TOKEN_FAIL = '[Auth] VALIDATE_TOKEN_FAIL',

}

export class ActionAuthLogin implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(readonly payload: any) { }
}

export class ActionAuthLoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionAuthLoginFail implements Action {
  readonly type = AuthActionTypes.LOGIN_FAIL;
  constructor(readonly payload: { error: HttpErrorResponse }) { }
}

export class ActionAuthLogout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class GetUser implements Action {
  readonly type = AuthActionTypes.GET_USER;
  constructor(readonly payload: any) { }
}

export class GetUserSuccess implements Action {
  readonly type = AuthActionTypes.GET_USER_SUCCESS;
  constructor(public payload: User) { }
}

export class GetUserFail implements Action {
  readonly type = AuthActionTypes.GET_USER_FAIL;
  constructor(public payload: Error) { }
}

export class ValidateToken implements Action {
  readonly type = AuthActionTypes.VALIDATE_TOKEN;
  constructor(public payload: any) { }
}

export class ValidateTokenSuccess implements Action {
  readonly type = AuthActionTypes.VALIDATE_TOKEN_SUCCESS;
  constructor(public payload: any) { }
}

export class ValidateTokenFail implements Action {
  readonly type = AuthActionTypes.VALIDATE_TOKEN_FAIL;
  constructor(public payload: any) { }
}

export class ChangePassword implements Action {
  readonly type = AuthActionTypes.CHANGE_PASSWORD;
  constructor(public payload: any) { }
}

export class ChangePasswordSuccess implements Action {
  readonly type = AuthActionTypes.CHANGE_PASSWORD_SUCCESS;
  constructor(public payload: any) { }
}

export class ChangePasswordFail implements Action {
  readonly type = AuthActionTypes.CHANGE_PASSWORD_FAIL;
  constructor(public payload: any) { }
}

export type AuthActions = GetUser | GetUserFail | GetUserSuccess | ActionAuthLogin | ActionAuthLoginSuccess | ActionAuthLoginFail | ActionAuthLogout | ChangePassword | ValidateToken | ValidateTokenSuccess | ValidateTokenFail | ChangePasswordSuccess | ChangePasswordFail;

