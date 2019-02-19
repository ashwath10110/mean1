import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { UsersActionTypes } from './users.actions';

import * as UsersActions from './users.actions';
import { UsersService } from './users.service';
import { AppService } from '@app/app/app.service';


@Injectable()
export class UnitUsersEffects {

  constructor(
    private actions$: Actions<Action>,
    private service: UsersService,
    private appService: AppService
  ) { }

  handleError(error) {
    this.appService.logError(error, true);
  }

  @Effect()
  getUsers = this.actions$.pipe(
    ofType<UsersActions.ActionGetUsers>(UsersActionTypes.GET_USERS),
    switchMap((action: UsersActions.ActionGetUsers) =>
      this.service
        .getTenantUsers()
        .pipe(
          map(res => new UsersActions.ActionGetUsersSuccess({ data: res })),
          catchError(error => {
            this.handleError(error);
            return of(new UsersActions.ActionGetUsersError({ error }))
          })
        )
    )
  );

  @Effect()
  getMappingUsers = this.actions$.pipe(
    ofType<UsersActions.ActionUnitMappingUser>(UsersActionTypes.GET_USERS_UNIT_MAPPING),
    switchMap((action: UsersActions.ActionUnitMappingUser) =>
      this.service
        .getMappingUsers(action.payload)
        .pipe(
          map(res => new UsersActions.ActionUnitMappingUserSuccess({ data: res })),
          catchError(error => {
            this.handleError(error);
            return of(new UsersActions.ActionUnitMappingUserError({ error }))
          })
        )
    )
  );

  @Effect()
  getUsersByUnitId = this.actions$.pipe(
    ofType<UsersActions.ActionGetUsersByUnitId>(UsersActionTypes.GET_USERS_BY_UNIT_ID),
    switchMap((action: UsersActions.ActionGetUsersByUnitId) =>
      this.service
        .getUsersByUnitId(action.payload)
        .pipe(
          map(res => new UsersActions.ActionGetUsersByUnitIdSuccess({ data: res.data })),
          catchError(error => {
            this.handleError(error);
            return of(new UsersActions.ActionGetUsersByUnitIdError({ error }))
          })
        )
    )
  );

  @Effect()
  updateUser = this.actions$.pipe(
    ofType<UsersActions.ActionUpdateUser>(UsersActionTypes.UPDATE_USER),
    switchMap((action: UsersActions.ActionUpdateUser) =>
      this.service
        .updateUserUnitId(action.payload.value)
        .pipe(
          map(tenants => new UsersActions.ActionUpdateUserSuccess(tenants)),
          catchError(error => {
            this.handleError(error);
            return of(new UsersActions.ActionUpdateUserError({ error }))
          })
        )
    )
  );

  @Effect()
  deleteUnitUserMapById = this.actions$.pipe(
    ofType<UsersActions.ActionDeleteUnitUserMapping>(UsersActionTypes.DELETE_UNIT_USER_MAPPING),
    switchMap((action: UsersActions.ActionDeleteUnitUserMapping) =>
      this.service
        .deleteUserUnitMappingById(action.payload)
        .pipe(
          map(res => new UsersActions.ActionDeleteUnitUserMappingSuccess({ data: res})),
          catchError(error => {
            this.handleError(error);
            return of(new UsersActions.ActionDeleteUnitUserMappingError({ error }))
          })
        )
    )
  );

  @Effect()
  deleteUserById = this.actions$.pipe(
    ofType<UsersActions.ActionDeleteUser>(UsersActionTypes.DELETE_USER),
    switchMap((action: UsersActions.ActionDeleteUser) =>
      this.service
        .deleteUserById(action.payload)
        .pipe(
          map(res => new UsersActions.ActionDeleteUserSuccess({ data: res })),
          catchError(error => {
            this.handleError(error);
            return of(new UsersActions.ActionDeleteUserError({ error }))
          })
        )
    )
  );

  @Effect()
  getUserDataForApprovalView =  this.actions$.pipe(
    ofType<UsersActions.ActionGetUsersDataForApprovalView>(UsersActionTypes.GET_USERS_DATA_FOR_APPROVAL_VIEW),
    switchMap((action: UsersActions.ActionGetUsersDataForApprovalView) =>
      this.service
        .getUsersDataForApprovalView(action.payload)
        .pipe(
          map(res => new UsersActions.ActionGetUsersDataForApprovalViewSuccess({ data: res })),
          catchError(error => {
            this.handleError(error);
            return of(new UsersActions.ActionGetUsersDataForApprovalViewError({ error }))
          })
        )
    )
  );

  @Effect()
  getMappingUsersByUserId = this.actions$.pipe(
    ofType<UsersActions.ActionUnitMappingUserByUserId>(UsersActionTypes.GET_USERS_UNIT_MAPPING_BY_USERID),
    switchMap((action: UsersActions.ActionUnitMappingUserByUserId) =>
      this.service
        .getMappingUsersByUserId(action.payload)
        .pipe(
          map(res => new UsersActions.ActionUnitMappingUserByUserIdSuccess({ data: res , isFromOrgTree: action.payload.isFromOrgTree})),
          catchError(error => {
            this.handleError(error);
            return of(new UsersActions.ActionUnitMappingUserByUserIdError({ error }))
          })
        )
    )
  );

  @Effect()
  approveUserMappingData =this.actions$.pipe(
    ofType<UsersActions.ActionApproveUsersData>(UsersActionTypes.APPROVE_USERS_DATA),
    switchMap((action: UsersActions.ActionApproveUsersData) =>
      this.service
       .updateUserUnitMapping(action.payload)
        .pipe(
          map(res => new UsersActions.ActionApproveUsersDataSuccess({ data: res })),
          catchError(error => {
            this.handleError(error);
            return of(new UsersActions.ActionApproveUsersDataError({ error }))
          })
        )
    )
  );
}
