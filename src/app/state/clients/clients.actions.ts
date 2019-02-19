import { Action } from '@ngrx/store';

export enum ClientsActionTypes {

  GET_TENANTS = '[clients] GET_TENANTS',
  GET_TENANTS_SUCCESS = '[clients] GET_TENANTS_SUCCESS',
  GET_TENANTS_ERROR = '[clients] GET_TENANTS_ERROR',

  DELETE_TENANT = '[clients] DELETE TENANTS',
  DELETE_TENANT_SUCCESS = '[clients] DELETE TENANTS_SUCCESS',
  DELETE_TENANT_ERROR = '[clients] DELETE TENANTS_ERROR',

  APPROVE_STEP2 = '[clients] APPROVE_STEP2',
  APPROVE_STEP2_SUCCESS = '[clients] APPROVE_STEP2_SUCCESS',
  APPROVE_STEP2_ERROR = '[clients] APPROVE_STEP2_ERROR',

  GET_TENANT_DETAILS = '[home] Get Tenant Details',
  GET_TENANT_DETAILS_SUCCESS = '[home] Get Tenant Details Success',
  GET_TENANT_DETAILS_ERROR = '[home] Get Tenant Details Error',

  UPDATE_TENANT = '[clients] UPDATE TENANTS',
  UPDATE_TENANT_SUCCESS = '[clients] UPDATE TENANTS_SUCCESS',
  UPDATE_TENANT_ERROR = '[clients] UPDATE TENANTS_ERROR',
}

export class ActionGetTenants implements Action {
  readonly type = ClientsActionTypes.GET_TENANTS;
  constructor(readonly payload: any) { }
}

export class ActionGetTenantsSuccess implements Action {
  readonly type = ClientsActionTypes.GET_TENANTS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetTenantsError implements Action {
  readonly type = ClientsActionTypes.GET_TENANTS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionDeleteTenant implements Action {
  readonly type = ClientsActionTypes.DELETE_TENANT;
  constructor(readonly payload: any) { }
}

export class ActionDeleteTenantSuccess implements Action {
  readonly type = ClientsActionTypes.DELETE_TENANT_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionDeleteTenantError implements Action {
  readonly type = ClientsActionTypes.DELETE_TENANT_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionUpdateTenant implements Action {
  readonly type = ClientsActionTypes.UPDATE_TENANT;
  constructor(readonly payload: any) { }
}

export class ActionUpdateTenantSuccess implements Action {
  readonly type = ClientsActionTypes.UPDATE_TENANT_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionUpdateTenantError implements Action {
  readonly type = ClientsActionTypes.UPDATE_TENANT_ERROR;
  constructor(readonly payload: any) { }
}


export class ActionGetTenantDetails implements Action {
  readonly type = ClientsActionTypes.GET_TENANT_DETAILS;
  constructor(readonly payload: any) { }
}

export class ActionGetTenantDetailsSuccess implements Action {
  readonly type = ClientsActionTypes.GET_TENANT_DETAILS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetTenantDetailsError implements Action {
  readonly type = ClientsActionTypes.GET_TENANT_DETAILS_ERROR;
  constructor(readonly payload: any) { }
}


export class ActionApproveStep2 implements Action {
  readonly type = ClientsActionTypes.APPROVE_STEP2;
  constructor(readonly payload: any) { }
}

export class ActionApproveStep2Success implements Action {
  readonly type = ClientsActionTypes.APPROVE_STEP2_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionApproveStep2Error implements Action {
  readonly type = ClientsActionTypes.APPROVE_STEP2_ERROR;
  constructor(readonly payload: any) { }
}

export type ClientsActions =

  | ActionGetTenants
  | ActionGetTenantsSuccess
  | ActionGetTenantsError

  | ActionDeleteTenant
  | ActionDeleteTenantSuccess
  | ActionDeleteTenantError

  | ActionUpdateTenant
  | ActionUpdateTenantSuccess
  | ActionUpdateTenantError

  | ActionApproveStep2
  | ActionApproveStep2Success
  | ActionApproveStep2Error

  | ActionGetTenantDetails
  | ActionGetTenantDetailsSuccess
  | ActionGetTenantDetailsError

  ;
