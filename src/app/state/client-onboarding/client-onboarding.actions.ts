import { Action } from '@ngrx/store';

export enum ClientOnboardingActionTypes {

  UPDATE_CLIENT_INFO_DATA = '[Client Info] Update Client Info Data',
  UPDATE_CLIENT_INFO_DATA_SUCCESS = '[Client Info] Update Client Info Data Success',
  UPDATE_CLIENT_INFO_DATA_ERROR = '[Client Info] Update Client Info Data Error',

  CREATE_CLIENT_DATA = '[Client Data] Create Client Data',
  CREATE_CLIENT_DATA_SUCCESS = '[Client Data] Create Client Data Success',
  CREATE_CLIENT_DATA_ERROR = '[Client Data] Create Client Data Error',

  UPDATE_CLIENT_DATA = '[Client Data] Update Client Data',
  UPDATE_CLIENT_DATA_SUCCESS = '[Client Data] Update Client Data Success',
  UPDATE_CLIENT_DATA_ERROR = '[Client Data] Update Client Data Error',

  CREATE_ADMIN_USER = '[Admin Data] Create Admin user',
  CREATE_ADMIN_USER_SUCCESS = '[Admin Data] Create Admin user Success',
  CREATE_ADMIN_USER_ERROR = '[Admin Data] Create Admin user Error',

  GET_ADMIN_USER = '[Admin Data] get Admin user',
  GET_ADMIN_USER_SUCCESS = '[Admin Data] get Admin user Success',
  GET_ADMIN_USER_ERROR = '[Admin Data] get Admin user Error',

  GET_CLIENT_CONTRACT_DATA = '[Client Contract] Get Client Contract Data',
  GET_CLIENT_CONTRACT_DATA_SUCCESS = '[Client Contract] Get Client Contract Data Success',
  GET_CLIENT_CONTRACT_DATA_ERROR = '[Client Contract] Get Client Contract Data Error',

  UPDATE_CLIENT_CONTRACT_DATA = '[Client Contract] Update Client Contract Data',
  UPDATE_CLIENT_CONTRACT_DATA_SUCCESS = '[Client Contract] Update Client Contract Data Success',
  UPDATE_CLIENT_CONTRACT_DATA_ERROR = '[Client Contract] Update Client Contract Data Error',

  GET_CLIENT_FINANCE_DATA = '[Client Finance] Get Client Finance Data',
  GET_CLIENT_FINANCE_DATA_SUCCESS = '[Client Finance] Get Client Finance Data Success',
  GET_CLIENT_FINANCE_DATA_ERROR = '[Client Finance] Get Client Finance Data Error',

  UPDATE_CLIENT_FINANCE_DATA = '[Client Finance] Update Client Finance Data',
  UPDATE_CLIENT_FINANCE_DATA_SUCCESS = '[Client Finance] Update Client Finance Data Success',
  UPDATE_CLIENT_FINANCE_DATA_ERROR = '[Client Finance] Update Client Finance Data Error',

  GET_CLIENT_ADMIN_ACCOUNTS_DATA = '[Client Admin Account] Get Client Admin Access Data',
  GET_CLIENT_ADMIN_ACCOUNTS_DATA_SUCCESS = '[Client Admin Account] Get Client Admin Access Data Success',
  GET_CLIENT_ADMIN_ACCOUNTS_DATA_ERROR = '[Client Admin Account] Get Client Admin Access Data Error',

  UPDATE_CLIENT_ADMIN_ACCOUNTS_DATA = '[Client Admin Account] Update Client Admin Access Data',
  UPDATE_CLIENT_ADMIN_ACCOUNTS_DATA_SUCCESS = '[Client Admin Account] Update Client Admin Access Data Success',
  UPDATE_CLIENT_ADMIN_ACCOUNTS_DATA_ERROR = '[Client Admin Account] Update Client Admin Access Data Error',

  GET_CLIENT_CONTACT_DETAILS = '[Client Contact] GET_CLIENT_CONTACT_DETAILS',
  GET_CLIENT_CONTACT_DETAILS_SUCCESS = '[Client Contact] GET_CLIENT_CONTACT_DETAILS_SUCCESS',
  GET_CLIENT_CONTACT_DETAILS_ERROR = '[Client Contact] GET_CLIENT_CONTACT_DETAILS_ERROR',

  GET_CLIENT_DETAILS = '[Client Detail ] GET_CLIENT_DETAILS',
  GET_CLIENT_DETAILS_SUCCESS = '[Client Detail] GET_CLIENT_DETAILS_SUCCESS',
  GET_CLIENT_DETAILS_ERROR = '[Client Detail] GET_CLIENT_DETAILS_ERROR',

  UPDATE_CLIENT_CONTACT_DETAILS = '[Client Onboarding] UPDATE_CLIENT_CONTACT_DETAILS',
  UPDATE_CLIENT_CONTACT_DETAILS_SUCCESS = '[Client Onboarding] UPDATE_CLIENT_CONTACT_DETAILS_SUCCESS',
  UPDATE_CLIENT_CONTACT_DETAILS_ERROR = '[Client Onboarding] UPDATE_CLIENT_CONTACT_DETAILS_ERROR',


  DELETE_CLIENT_CONTACT_DETAILS = '[Client Onboarding] DELETE_CLIENT_CONTACT_DETAILS',
  DELETE_CLIENT_CONTACT_DETAILS_SUCCESS = '[Client Onboarding] DELETE_CLIENT_CONTACT_DETAILS_SUCCESS',
  DELETE_CLIENT_CONTACT_DETAILS_ERROR = '[Client Onboarding] DELETE_CLIENT_CONTACT_DETAILS_SUCCESS',

  UPDATE_CLIENT_CONTACT_DETAILS_SUCCESS_AUTO_FLOW = '[Client Onboarding] UPDATE_CLIENT_CONTACT_DETAILS_SUCCESS_AUTO_FLOW',
}

export class ActionCreateClientData implements Action {
  readonly type = ClientOnboardingActionTypes.CREATE_CLIENT_DATA;
  constructor(readonly payload: any) { }
}

export class ActionCreateClientDataSuccess implements Action {
  readonly type = ClientOnboardingActionTypes.CREATE_CLIENT_DATA_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionCreateClientDataError implements Action {
  readonly type = ClientOnboardingActionTypes.CREATE_CLIENT_DATA_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionUpdateClientData implements Action {
  readonly type = ClientOnboardingActionTypes.UPDATE_CLIENT_DATA;
  constructor(readonly payload: any) { }
}

export class ActionUpdateClientDataSuccess implements Action {
  readonly type = ClientOnboardingActionTypes.UPDATE_CLIENT_DATA_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionUpdateClientDataError implements Action {
  readonly type = ClientOnboardingActionTypes.UPDATE_CLIENT_DATA_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionGetClientContractData implements Action {
  readonly type = ClientOnboardingActionTypes.GET_CLIENT_CONTRACT_DATA;
  constructor(readonly payload: any) { }
}

export class ActionGetClientContractDataSuccess implements Action {
  readonly type = ClientOnboardingActionTypes.GET_CLIENT_CONTRACT_DATA_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetClientContractDataError implements Action {
  readonly type = ClientOnboardingActionTypes.GET_CLIENT_CONTRACT_DATA_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionUpdateClientContractData implements Action {
  readonly type = ClientOnboardingActionTypes.UPDATE_CLIENT_CONTRACT_DATA;
  constructor(readonly payload: any) { }
}

export class ActionUpdateClientContractDataSuccess implements Action {
  readonly type = ClientOnboardingActionTypes.UPDATE_CLIENT_CONTRACT_DATA_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionUpdateClientContractDataError implements Action {
  readonly type = ClientOnboardingActionTypes.UPDATE_CLIENT_CONTRACT_DATA_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionGetClientFinanceData implements Action {
  readonly type = ClientOnboardingActionTypes.GET_CLIENT_FINANCE_DATA;
  constructor(readonly payload: any) { }
}

export class ActionGetClientFinanceDataSuccess implements Action {
  readonly type = ClientOnboardingActionTypes.GET_CLIENT_FINANCE_DATA_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetClientFinanceDataError implements Action {
  readonly type = ClientOnboardingActionTypes.GET_CLIENT_FINANCE_DATA_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionUpdateClientFinanceData implements Action {
  readonly type = ClientOnboardingActionTypes.UPDATE_CLIENT_FINANCE_DATA;
  constructor(readonly payload: any) { }
}

export class ActionUpdateClientFinanceDataSuccess implements Action {
  readonly type = ClientOnboardingActionTypes.UPDATE_CLIENT_FINANCE_DATA_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionUpdateClientFinanceDataError implements Action {
  readonly type = ClientOnboardingActionTypes.UPDATE_CLIENT_FINANCE_DATA_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionCreateTenant implements Action {
  readonly type = ClientOnboardingActionTypes.UPDATE_CLIENT_INFO_DATA;
  constructor(readonly payload: any) { }
}

export class ActionCreateTenantSuccess implements Action {
  readonly type = ClientOnboardingActionTypes.UPDATE_CLIENT_INFO_DATA_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionCreateTenantError implements Action {
  readonly type = ClientOnboardingActionTypes.UPDATE_CLIENT_INFO_DATA_ERROR;
  constructor(readonly payload: any) { }
}


export class ActionGetClientAdminAccountsData implements Action {
  readonly type = ClientOnboardingActionTypes.GET_CLIENT_ADMIN_ACCOUNTS_DATA;
  constructor(readonly payload: any) { }
}

export class ActionGetClientAdminAccountsDataSuccess implements Action {
  readonly type = ClientOnboardingActionTypes.GET_CLIENT_ADMIN_ACCOUNTS_DATA_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetClientAdminAccountsDataError implements Action {
  readonly type = ClientOnboardingActionTypes.GET_CLIENT_ADMIN_ACCOUNTS_DATA_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionUpdateClientAdminAccountsData implements Action {
  readonly type = ClientOnboardingActionTypes.UPDATE_CLIENT_ADMIN_ACCOUNTS_DATA;
  constructor(readonly payload: any) { }
}

export class ActionUpdateClientAdminAccountsDataSuccess implements Action {
  readonly type = ClientOnboardingActionTypes.UPDATE_CLIENT_ADMIN_ACCOUNTS_DATA_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionUpdateClientAdminAccountsDataError implements Action {
  readonly type = ClientOnboardingActionTypes.UPDATE_CLIENT_ADMIN_ACCOUNTS_DATA_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionGetClientContactDetails implements Action {
  readonly type = ClientOnboardingActionTypes.GET_CLIENT_CONTACT_DETAILS;
  constructor(readonly payload: any) { }
}

export class ActionGetClientContactDetailsSuccess implements Action {
  readonly type = ClientOnboardingActionTypes.GET_CLIENT_CONTACT_DETAILS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetClientContactDetailsError implements Action {
  readonly type = ClientOnboardingActionTypes.GET_CLIENT_CONTACT_DETAILS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionUpdateClientContactDetails implements Action {
  readonly type = ClientOnboardingActionTypes.UPDATE_CLIENT_CONTACT_DETAILS;
  constructor(readonly payload: any) { }
}

export class ActionUpdateClientContactDetailsSuccess implements Action {
  readonly type = ClientOnboardingActionTypes.UPDATE_CLIENT_CONTACT_DETAILS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionUpdateClientContactDetailsError implements Action {
  readonly type = ClientOnboardingActionTypes.UPDATE_CLIENT_CONTACT_DETAILS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionDeleteClientContactDetails implements Action {
  readonly type = ClientOnboardingActionTypes.DELETE_CLIENT_CONTACT_DETAILS;
  constructor(readonly payload: any) { }
}

export class ActionDeleteClientContactDetailsSuccess implements Action {
  readonly type = ClientOnboardingActionTypes.DELETE_CLIENT_CONTACT_DETAILS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionDeleteClientContactDetailsError implements Action {
  readonly type = ClientOnboardingActionTypes.DELETE_CLIENT_CONTACT_DETAILS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionCreateAdminUser implements Action {
  readonly type = ClientOnboardingActionTypes.CREATE_ADMIN_USER;
  constructor(readonly payload: any) { }
}

export class ActionCreateAdminUserSuccess implements Action {
  readonly type = ClientOnboardingActionTypes.CREATE_ADMIN_USER_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionCreateAdminUserError implements Action {
  readonly type = ClientOnboardingActionTypes.CREATE_ADMIN_USER_ERROR;
  constructor(readonly payload: any) { }
}


export class ActionGetAdminUser implements Action {
  readonly type = ClientOnboardingActionTypes.GET_ADMIN_USER;
  constructor(readonly payload: any) { }
}

export class ActionGetAdminUserSuccess implements Action {
  readonly type = ClientOnboardingActionTypes.GET_ADMIN_USER_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetAdminUserError implements Action {
  readonly type = ClientOnboardingActionTypes.GET_ADMIN_USER_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionUpdateClientContactDetailsSuccessAutoFlow implements Action {
  readonly type = ClientOnboardingActionTypes.UPDATE_CLIENT_CONTACT_DETAILS_SUCCESS_AUTO_FLOW;
  constructor(readonly payload: any) { }
}

export class ActionGetClientDetails implements Action {
  readonly type = ClientOnboardingActionTypes.GET_CLIENT_DETAILS;
  constructor(readonly payload: any) { }
}

export class ActionGetClientDetailsSuccess implements Action {
  readonly type = ClientOnboardingActionTypes.GET_CLIENT_DETAILS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetClientDetailsError implements Action {
  readonly type = ClientOnboardingActionTypes.GET_CLIENT_DETAILS_ERROR;
  constructor(readonly payload: any) { }
}


export type ClientOnBoardingActions =

  | ActionCreateClientData
  | ActionCreateClientDataSuccess
  | ActionCreateClientDataError

  | ActionUpdateClientData
  | ActionUpdateClientDataSuccess
  | ActionUpdateClientDataError

  | ActionGetClientContractData
  | ActionGetClientContractDataSuccess
  | ActionGetClientContractDataError

  | ActionUpdateClientContractData
  | ActionUpdateClientContractDataSuccess
  | ActionUpdateClientContractDataError

  | ActionGetClientFinanceData
  | ActionGetClientFinanceDataSuccess
  | ActionGetClientFinanceDataError

  | ActionUpdateClientFinanceData
  | ActionUpdateClientFinanceDataSuccess
  | ActionUpdateClientFinanceDataError

  | ActionCreateTenant
  | ActionCreateTenantSuccess
  | ActionCreateTenantError

  | ActionGetClientAdminAccountsData
  | ActionGetClientAdminAccountsDataSuccess
  | ActionGetClientAdminAccountsDataError

  | ActionUpdateClientAdminAccountsData
  | ActionUpdateClientAdminAccountsDataSuccess
  | ActionUpdateClientAdminAccountsDataError

  | ActionGetClientContactDetails
  | ActionGetClientContactDetailsSuccess
  | ActionGetClientContactDetailsError

  | ActionUpdateClientContactDetails
  | ActionUpdateClientContactDetailsSuccess
  | ActionUpdateClientContactDetailsError


  | ActionDeleteClientContactDetails
  | ActionDeleteClientContactDetailsSuccess
  | ActionDeleteClientContactDetailsError

  | ActionCreateAdminUser
  | ActionCreateAdminUserSuccess
  | ActionCreateAdminUserError

  | ActionGetAdminUser
  | ActionGetAdminUserSuccess
  | ActionGetAdminUserError

  | ActionGetClientDetails
  | ActionGetClientDetailsSuccess
  | ActionGetClientDetailsError

  | ActionUpdateClientContactDetailsSuccessAutoFlow

  ;
