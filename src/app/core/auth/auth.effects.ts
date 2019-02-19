import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AppService } from '@app/app/app.service';

import { LocalStorageService } from '../local-storage/local-storage.service';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import {
  ActionAuthLogin,
  ActionAuthLogout,
  AuthActionTypes,
  ActionAuthLoginSuccess,
  ActionAuthLoginFail,
  GetUserSuccess,
  GetUser,
  GetUserFail,
  ValidateToken,
  ValidateTokenSuccess,
  ValidateTokenFail,
  ChangePasswordSuccess,
  ChangePassword,
  ChangePasswordFail
} from './auth.actions';
import { AuthService } from '@app/core/auth/auth.service';
import { State } from '@app/state/home/home.state';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private router: Router,
    private authService: AuthService,
     private appService: AppService,
    private store: Store<State>,
    private updates$: Actions
  ) { }

  handleError(response) {
    this.appService.logError(response, true);
  }

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType(AuthActionTypes.GET_USER),
    map((action: GetUser) => action.payload),
    // Use `exhaustMap` to wait for Observable respond
    exhaustMap((credentials: any) =>
      this.authService
        .getUser()
        .pipe(
          map(username => new GetUserSuccess(username)),
          catchError(error => of(new GetUserFail(error)))
        )
    )
  );

  // If the user is logged in, let it goes to "Team App"
  @Effect({ dispatch: false })
  getUserSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.GET_USER_SUCCESS),
    tap((res) => {
      const token = res['payload'].access_token;
      // this.localStorageService.setItem('token', token);
      // this.router.navigate(['/home']);
      const perm = res['payload'].data.roles;
      this.authService.loadPermissions(perm);
    })
  );

  @Effect({ dispatch: false })
  getUserFail$ = this.actions$.pipe(
    ofType(AuthActionTypes.GET_USER_FAIL),
    tap(() => {
      this.localStorageService.setItem('token', null);
      this.router.navigate(['/login']);
    })
  );

  @Effect()
  // Once it detects such signal (it's a string as we defined in "Action")
  // It will call 
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    tap(action => {
    }
    ),
    map((action: ActionAuthLogin) => action.payload),
    // Use `exhaustMap` to wait for Observable respond
    exhaustMap((credentials: any) =>
      this.authService
        .logIn(credentials)
        .pipe(
          map(username => new ActionAuthLoginSuccess(username)),
          catchError(error => {
          this.handleError(error);
          return of(new ActionAuthLoginFail(error))
          })
        )
    )
  );

  @Effect({ dispatch: false })
  // If the user is logged in, let it goes to "Team App"
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((res) => {
      const token = res['payload'].access_token;
      this.localStorageService.setItem('token', token);
      this.store.dispatch(new GetUser({}));
      this.updates$.pipe(
        ofType<GetUserSuccess>(AuthActionTypes.GET_USER_SUCCESS),
        tap(action =>
          this.router.navigate(['/'])
        )
      ).subscribe();
    })
  );

  loginFail$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_FAIL),
    tap(() => {
      
    })
  );

  @Effect({ dispatch: false })
  logout = this.actions$.pipe(
    ofType<ActionAuthLogout>(AuthActionTypes.LOGOUT),
    tap(() => {
      this.localStorageService.setItem('token', null);
      this.router.navigate(['/login']);
    })
  );

  @Effect()
  validateToken$ = this.actions$.pipe(
    ofType(AuthActionTypes.VALIDATE_TOKEN),
    map((action: ValidateToken) => action.payload),
    // Use `exhaustMap` to wait for Observable respond
    exhaustMap((token: any) =>
      this.authService
        .validateToken(token)
        .pipe(
          map(res => new ValidateTokenSuccess(res)),
          catchError(error => of(new ValidateTokenFail(error)))
        )
    )
  );

  @Effect()
  changePassword$ = this.actions$.pipe(
    ofType(AuthActionTypes.CHANGE_PASSWORD),
    map((action: ChangePassword) => action.payload),
    // Use `exhaustMap` to wait for Observable respond
    exhaustMap((payload: any) =>
      this.authService
        .changePassword(payload)
        .pipe(
          map(res => new ChangePasswordSuccess(res)),
          catchError(error => of(new ChangePasswordFail(error)))
        )
    )
  );

}
