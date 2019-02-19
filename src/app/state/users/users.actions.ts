import { Action } from '@ngrx/store';

export enum UsersActionTypes {

  GET_USERS = '[users] GET_USERS',
  GET_USERS_SUCCESS = '[users] GET_USERS_SUCCESS',
  GET_USERS_ERROR = '[users] GET_USERS_ERROR',

  GET_USERS_UNIT_MAPPING = '[users] GET_USERS_UNIT_MAPPING',
  GET_USERS_UNIT_MAPPING_SUCCESS = '[users] GET_USERS_UNIT_MAPPING_SUCCESS',
  GET_USERS_UNIT_MAPPING_ERROR = '[users] GET_USERS_UNIT_MAPPING_ERROR',

  GET_USERS_BY_UNIT_ID = '[home] GET_USERS_BY_UNIT_ID',
  GET_USERS_BY_UNIT_ID_SUCCESS = '[home] GET_USERS_BY_UNIT_ID_SUCCESS',
  GET_USERS_BY_UNIT_ID_ERROR = '[home] GET_USERS_BY_UNIT_ID_ERROR',

  UPDATE_USER = '[home] UPDATE_USER',
  UPDATE_USER_SUCCESS = '[home] UPDATE_USER_SUCCESS',
  UPDATE_USER_ERROR = '[home] UPDATE_USER_ERROR',

  DELETE_USER = '[users] DELETE_USER',
  DELETE_USER_SUCCESS = '[users] DELETE_USER_SUCCESS',
  DELETE_USER_ERROR = '[users] DELETE_USER_ERROR',

  DELETE_UNIT_USER_MAPPING = '[users] DELETE_UNIT_USER_MAPPING',
  DELETE_UNIT_USER_MAP_SUCCESS = '[users] DELETE_UNIT_USER_MAP_SUCCESS',
  DELETE_UNIT_USER_MAP_ERROR = '[users] DELETE_UNIT_USER_MAP_ERROR',

  ADD_MORE_USERS = '[home] ADD_MORE_USERS',

  APPROVE_USERS = '[home] APPROVE_USERS',

  GET_USERS_DATA_FOR_APPROVAL_VIEW = '[home] GET_USERS_DATA_FOR_APPROVAL_VIEW',
  GET_USERS_DATA_FOR_APPROVAL_VIEW_SUCCESS = '[home] GET_USERS_DATA_FOR_APPROVAL_VIEW_SUCCESS',
  GET_USERS_DATA_FOR_APPROVAL_VIEW_ERROR  = '[home] GET_USERS_DATA_FOR_APPROVAL_VIEW_ERROR',


  GET_USERS_UNIT_MAPPING_BY_USERID = '[users] GET_USERS_UNIT_MAPPING_BY_USERID',
  GET_USERS_UNIT_MAPPING_BY_USERID_SUCCESS = '[users] GET_USERS_UNIT_MAPPING_BY_USERID_SUCCESS',
  GET_USERS_UNIT_MAPPING_BY_USERID_ERROR = '[users] GET_USERS_UNIT_MAPPING_BY_USERID_ERROR',

  APPROVE_USERS_DATA = '[users] APPROVE_USERS_DATA',
  APPROVE_USERS_DATA_SUCCESS = '[users] APPROVE_USERS_DATA_SUCCESS',
  APPROVE_USERS_DATA_ERROR = '[users] APPROVE_USERS_DATA_ERRORA'

}

export class ActionAddMoreUser implements Action {
  readonly type = UsersActionTypes.ADD_MORE_USERS;
  constructor(readonly payload: any) { }
}

export class ActionGetUsers implements Action {
  readonly type = UsersActionTypes.GET_USERS;
  constructor(readonly payload: any) { }
}

export class ActionGetUsersSuccess implements Action {
  readonly type = UsersActionTypes.GET_USERS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetUsersError implements Action {
  readonly type = UsersActionTypes.GET_USERS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionUpdateUser implements Action {
  readonly type = UsersActionTypes.UPDATE_USER;
  constructor(readonly payload: any) { }
}

export class ActionUpdateUserSuccess implements Action {
  readonly type = UsersActionTypes.UPDATE_USER_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionUpdateUserError implements Action {
  readonly type = UsersActionTypes.UPDATE_USER_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionDeleteUser implements Action {
  readonly type = UsersActionTypes.DELETE_USER;
  constructor(readonly payload: any) { }
}

export class ActionDeleteUserSuccess implements Action {
  readonly type = UsersActionTypes.DELETE_USER_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionDeleteUserError implements Action {
  readonly type = UsersActionTypes.DELETE_USER_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionDeleteUnitUserMapping implements Action {
  readonly type = UsersActionTypes.DELETE_UNIT_USER_MAPPING;
  constructor(readonly payload: any) { }
}

export class ActionDeleteUnitUserMappingSuccess implements Action {
  readonly type = UsersActionTypes.DELETE_UNIT_USER_MAP_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionDeleteUnitUserMappingError implements Action {
  readonly type = UsersActionTypes.DELETE_UNIT_USER_MAP_ERROR;
  constructor(readonly payload: any) { }
}
export class ActionGetUsersByUnitId implements Action {
  readonly type = UsersActionTypes.GET_USERS_BY_UNIT_ID;
  constructor(readonly payload: any) { }
}

export class ActionGetUsersByUnitIdSuccess implements Action {
  readonly type = UsersActionTypes.GET_USERS_BY_UNIT_ID_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetUsersByUnitIdError implements Action {
  readonly type = UsersActionTypes.GET_USERS_BY_UNIT_ID_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionUnitMappingUser implements Action {
  readonly type = UsersActionTypes.GET_USERS_UNIT_MAPPING;
  constructor(readonly payload: any) { }
}

export class ActionUnitMappingUserSuccess implements Action {
  readonly type = UsersActionTypes.GET_USERS_UNIT_MAPPING_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionUnitMappingUserError implements Action {
  readonly type = UsersActionTypes.GET_USERS_UNIT_MAPPING_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionApproveUsers implements Action {
  readonly type = UsersActionTypes.APPROVE_USERS;
  constructor(readonly payload: any) { }
}

export class ActionGetUsersDataForApprovalView implements Action {
  readonly type = UsersActionTypes.GET_USERS_DATA_FOR_APPROVAL_VIEW;
  constructor(readonly payload: any) { }
}

export class ActionGetUsersDataForApprovalViewSuccess implements Action {
  readonly type = UsersActionTypes.GET_USERS_DATA_FOR_APPROVAL_VIEW_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetUsersDataForApprovalViewError implements Action {
  readonly type = UsersActionTypes.GET_USERS_DATA_FOR_APPROVAL_VIEW_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionUnitMappingUserByUserId implements Action {
  readonly type = UsersActionTypes.GET_USERS_UNIT_MAPPING_BY_USERID;
  constructor(readonly payload: any) { }
}

export class ActionUnitMappingUserByUserIdSuccess implements Action {
  readonly type = UsersActionTypes.GET_USERS_UNIT_MAPPING_BY_USERID_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionUnitMappingUserByUserIdError implements Action {
  readonly type = UsersActionTypes.GET_USERS_UNIT_MAPPING_BY_USERID_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionApproveUsersData implements Action {
  readonly type = UsersActionTypes.APPROVE_USERS_DATA;
  constructor(readonly payload: any) { }
}

export class ActionApproveUsersDataSuccess implements Action {
  readonly type = UsersActionTypes.APPROVE_USERS_DATA_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionApproveUsersDataError implements Action {
  readonly type = UsersActionTypes.APPROVE_USERS_DATA_ERROR;
  constructor(readonly payload: any) { }
}

export type UsersActions =

  | ActionGetUsers
  | ActionGetUsersSuccess
  | ActionGetUsersError

  | ActionGetUsers
  | ActionGetUsersSuccess
  | ActionGetUsersError

  | ActionUpdateUser
  | ActionUpdateUserSuccess
  | ActionUpdateUserError

  | ActionGetUsersByUnitId
  | ActionGetUsersByUnitIdSuccess
  | ActionGetUsersByUnitIdError

  | ActionDeleteUser
  | ActionDeleteUserSuccess
  | ActionDeleteUserError

  | ActionDeleteUnitUserMapping
  | ActionDeleteUnitUserMappingSuccess
  | ActionDeleteUnitUserMappingError

  | ActionAddMoreUser

  | ActionApproveUsers

  | ActionUnitMappingUser
  | ActionUnitMappingUserSuccess
  | ActionUnitMappingUserError

  | ActionGetUsersDataForApprovalView
  | ActionGetUsersDataForApprovalViewSuccess
  | ActionGetUsersDataForApprovalViewError

  | ActionUnitMappingUserByUserId
  | ActionUnitMappingUserByUserIdSuccess
  | ActionUnitMappingUserByUserIdError

  | ActionApproveUsersData
  | ActionApproveUsersDataSuccess
  | ActionApproveUsersDataError

  ;
