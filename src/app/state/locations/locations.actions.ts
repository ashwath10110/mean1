import { Action } from '@ngrx/store';

export enum LocationsActionTypes {

  GET_COUNTRY = '[locations] GET_COUNTRY',
  GET_COUNTRY_SUCCESS = '[locations] GET_COUNTRY_SUCCESS',
  GET_COUNTRY_ERROR = '[locations] GET_COUNTRY_ERROR',

  GET_COUNTRY_STATE_CITY = '[locations] GET_COUNTRY_STATE_CITY',
  GET_COUNTRY_STATE_CITY_SUCCESS = '[locations] GET_COUNTRY_STATE_CITY_SUCCESS',
  GET_COUNTRY_STATE_CITY_ERROR = '[locations] GET_COUNTRY_STATE_CITY_ERROR',

  GET_STATE_BY_COUNTRY_ID = '[locations] GET_STATE_BY_COUNTRY_ID',
  GET_STATE_BY_COUNTRY_ID_SUCCESS = '[locations] GET_STATE_BY_COUNTRY_ID_SUCCESS',
  GET_STATE_BY_COUNTRY_ID_ERROR = '[locations] GET_STATE_BY_COUNTRY_ID_ERROR',

  GET_CITY_BY_STATE_ID = '[locations] GET_CITY_BY_STATE_ID',
  GET_CITY_BY_STATE_ID_SUCCESS = '[locations] GET_CITY_BY_STATE_ID_SUCCESS',
  GET_CITY_BY_STATE_ID_ERROR = '[locations] GET_CITY_BY_STATE_ID_ERROR',

  GET_COUNTRY_ID_STATE_ID_BY_CITY_ID = '[locations] GET_COUNTRY_ID_STATE_ID_BY_CITY_ID',
  GET_COUNTRY_ID_STATE_ID_BY_CITY_ID_SUCCESS = '[locations] GET_COUNTRY_ID_STATE_ID_BY_CITY_ID_SUCCESS',
  GET_COUNTRY_ID_STATE_ID_BY_CITY_ID_ERROR = '[locations] GET_COUNTRY_ID_STATE_ID_BY_CITY_ID_ERROR',

  CLEAR_ADDRESS_STATE = '[locations] CLEAR_ADDRESS_STATE',

}

export class ActionGetCountryStateCity implements Action {
  readonly type = LocationsActionTypes.GET_COUNTRY_STATE_CITY;
  constructor(readonly payload: any) { }
}

export class ActionGetCountryStateCitySuccess implements Action {
  readonly type = LocationsActionTypes.GET_COUNTRY_STATE_CITY_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetCountryStateCityError implements Action {
  readonly type = LocationsActionTypes.GET_COUNTRY_STATE_CITY_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionGetCountry implements Action {
  readonly type = LocationsActionTypes.GET_COUNTRY;
  constructor(readonly payload: any) { }
}

export class ActionGetCountrySuccess implements Action {
  readonly type = LocationsActionTypes.GET_COUNTRY_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetCountryError implements Action {
  readonly type = LocationsActionTypes.GET_COUNTRY_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionGetStateByCountryId implements Action {
  readonly type = LocationsActionTypes.GET_STATE_BY_COUNTRY_ID;
  constructor(readonly payload: any) { }
}

export class ActionGetStateByCountryIdSuccess implements Action {
  readonly type = LocationsActionTypes.GET_STATE_BY_COUNTRY_ID_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetStateByCountryIdError implements Action {
  readonly type = LocationsActionTypes.GET_STATE_BY_COUNTRY_ID_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionGetCityByStateId implements Action {
  readonly type = LocationsActionTypes.GET_CITY_BY_STATE_ID;
  constructor(readonly payload: any) { }
}

export class ActionGetCityByStateIdSuccess implements Action {
  readonly type = LocationsActionTypes.GET_CITY_BY_STATE_ID_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetCityByStateIdError implements Action {
  readonly type = LocationsActionTypes.GET_CITY_BY_STATE_ID_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionGetCountryIdStateIdByCityId implements Action {
  readonly type = LocationsActionTypes.GET_COUNTRY_ID_STATE_ID_BY_CITY_ID;
  constructor(readonly payload: any) { }
}

export class ActionGetCountryIdStateIdByCityIdSuccess implements Action {
  readonly type = LocationsActionTypes.GET_COUNTRY_ID_STATE_ID_BY_CITY_ID_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetCountryIdStateIdByCityIdError implements Action {
  readonly type = LocationsActionTypes.GET_COUNTRY_ID_STATE_ID_BY_CITY_ID_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionClearAddressState implements Action {
  readonly type = LocationsActionTypes.CLEAR_ADDRESS_STATE;
  constructor(readonly payload: any) { }
}


export type LocationsActions =

  |ActionGetCountryStateCity
  | ActionGetCountryStateCitySuccess
  | ActionGetCountryStateCityError

  | ActionGetCountry
  | ActionGetCountrySuccess
  | ActionGetCountryError

  | ActionGetStateByCountryId
  | ActionGetStateByCountryIdSuccess
  | ActionGetStateByCountryIdError

  | ActionGetCityByStateId
  | ActionGetCityByStateIdSuccess
  | ActionGetCityByStateIdError

  | ActionGetCountryIdStateIdByCityId
  | ActionGetCountryIdStateIdByCityIdSuccess
  | ActionGetCountryIdStateIdByCityIdError

  | ActionClearAddressState

  ;
