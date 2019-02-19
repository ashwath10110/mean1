import { Action } from '@ngrx/store';

export enum UnitsActionTypes {

  GET_TENANT_UNITS = '[units] Get Tenant Units',
  GET_TENANT_UNITS_SUCCESS = '[units] Get Tenant Units Success',
  GET_TENANT_UNITS_ERROR = '[units] Get Tenant Units Error',

  DELETE_TENANT_UNIT = '[units] Delete Tenant Unit',
  DELETE_TENANT_UNIT_SUCCESS = '[units] Delete Tenant Unit Success',
  DELETE_TENANT_UNIT_ERROR = '[units] Delete Tenant Unit Error',

  CREATE_TENANT_UNIT = '[units] Create Tenant Unit',
  CREATE_TENANT_UNIT_SUCCESS = '[units] Create Tenant Unit Success',
  CREATE_TENANT_UNIT_ERROR = '[units] Create Tenant Unit Error',

  GO_TO_SET_UP_UNIT = '[units] GO_TO_SET_UP_UNIT',

}

export class ActionGetTenantUnits implements Action {
  readonly type = UnitsActionTypes.GET_TENANT_UNITS;
  constructor(readonly payload: any) { }
}

export class ActionGetTenantUnitsSuccess implements Action {
  readonly type = UnitsActionTypes.GET_TENANT_UNITS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetTenantUnitsError implements Action {
  readonly type = UnitsActionTypes.GET_TENANT_UNITS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionDeleteTenantUnit implements Action {
  readonly type = UnitsActionTypes.DELETE_TENANT_UNIT;
  constructor(readonly payload: any) { }
}

export class ActionDeleteTenantUnitSuccess implements Action {
  readonly type = UnitsActionTypes.DELETE_TENANT_UNIT_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionDeleteTenantUnitError implements Action {
  readonly type = UnitsActionTypes.DELETE_TENANT_UNIT_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionCreateTenantUnit implements Action {
  readonly type = UnitsActionTypes.CREATE_TENANT_UNIT;
  constructor(readonly payload: any) { }
}

export class ActionCreateTenantUnitSuccess implements Action {
  readonly type = UnitsActionTypes.CREATE_TENANT_UNIT_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionCreateTenantUnitError implements Action {
  readonly type = UnitsActionTypes.CREATE_TENANT_UNIT_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionGoToSetUpUnit implements Action {
  readonly type = UnitsActionTypes.GO_TO_SET_UP_UNIT;
  constructor(readonly payload: any) { }
}

export type UnitsActions =

  | ActionGetTenantUnits
  | ActionGetTenantUnitsSuccess
  | ActionGetTenantUnitsError

  | ActionCreateTenantUnit
  | ActionCreateTenantUnitSuccess
  | ActionCreateTenantUnitError

  | ActionDeleteTenantUnit
  | ActionDeleteTenantUnitSuccess
  | ActionDeleteTenantUnitError

  | ActionCreateTenantUnit
  | ActionCreateTenantUnitSuccess
  | ActionCreateTenantUnitError

  | ActionGoToSetUpUnit

  ;
