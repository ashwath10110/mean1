import { Action } from '@ngrx/store';

export enum DetailsActionTypes {

  RESET_UNIT_STATE = '[Current Client] RESET_UNIT_STATE',

  GET_UNIT_DETAILS = '[Current Client] GET_UNIT_DETAILS',
  GET_UNIT_DETAILS_SUCCESS = '[Current Client] GET_UNIT_DETAILS_SUCCESS',
  GET_UNIT_DETAILS_ERROR = '[Current Client] GET_UNIT_DETAILS_ERROR',

  UPDATE_UNIT_DETAILS = '[Current Client] UPDATE_UNIT_DETAILS',
  UPDATE_UNIT_DETAILS_SUCCESS = '[Current Client] UPDATE_UNIT_DETAILS_SUCCESS',
  UPDATE_UNIT_DETAILS_ERROR = '[Current Client] UPDATE_UNIT_DETAILS_ERROR',

  GET_UNIT_FINANCE = '[Current Client] GET_UNIT_FINANCE',
  GET_UNIT_FINANCE_SUCCESS = '[Current Client] GET_UNIT_FINANCE_SUCCESS',
  GET_UNIT_FINANCE_ERROR = '[Current Client] GET_UNIT_FINANCE_ERROR',

  UPDATE_UNIT_FINANCE = '[Current Client] UPDATE_UNIT_FINANCE',
  UPDATE_UNIT_FINANCE_SUCCESS = '[Current Client] UPDATE_UNIT_FINANCE_SUCCESS',
  UPDATE_UNIT_FINANCE_ERROR = '[Current Client] UPDATE_UNIT_FINANCE_ERROR',

  PROCEED_TO_FINANCE = '[Current Client] PROCEED_TO_FINANCE',
  PROCEED_TO_SPECIALITIES = '[Current Client] PROCEED_TO_SPECIALITIES',
  PROCEED_TO_DOCTORS = '[Current Client] PROCEED_TO_DOCTORS',
  PROCEED_TO_USERS = '[Current Client] PROCEED_TO_USERS',
  PROCEED_TO_PARTNERS = '[Current Client] PROCEED_TO_PARTNERS',

  GET_UNIT_FINANCE_DETAILS = '[home] GET_UNIT_FINANCE_DETAILS',
  GET_UNIT_FINANCE_DETAILS_SUCCESS = '[home] GET_UNIT_FINANCE_DETAILS_SUCCESS',
  GET_UNIT_FINANCE_DETAILS_ERROR = '[home] GET_UNIT_FINANCE_DETAILS_ERROR',

  UPDATE_UNIT_FINANCE_DETAILS = '[home] UPDATE_UNIT_FINANCE_DETAILS',
  UPDATE_UNIT_FINANCE_DETAILS_SUCCESS = '[home] UPDATE_UNIT_FINANCE_DETAILS_SUCCESS',
  UPDATE_UNIT_FINANCE_DETAILS_ERROR = '[home] UPDATE_UNIT_FINANCE_DETAILS_ERROR',

  GET_UNIT_CONTACT_DETAILS = '[home] GET_UNIT_CONTACT_DETAILS',
  GET_UNIT_CONTACT_DETAILS_SUCCESS = '[home] GET_UNIT_CONTACT_DETAILS_SUCCESS',
  GET_UNIT_CONTACT_DETAILS_ERROR = '[home] GET_UNIT_CONTACT_DETAILS_ERROR',

  UPDATE_UNIT_CONTACT_DETAILS = '[home] UPDATE_UNIT_CONTACT_DETAILS',
  UPDATE_UNIT_CONTACT_DETAILS_SUCCESS = '[home] UPDATE_UNIT_CONTACT_DETAILS_SUCCESS',
  UPDATE_UNIT_CONTACT_DETAILS_ERROR = '[home] UPDATE_UNIT_CONTACT_DETAILS_ERROR',

  GET_UNIT_ADDRESS_DETAILS = '[home] GET_UNIT_ADDRESS_DETAILS',
  GET_UNIT_ADDRESS_DETAILS_SUCCESS = '[home] GET_UNIT_ADDRESS_DETAILS_SUCCESS',
  GET_UNIT_ADDRESS_DETAILS_ERROR = '[home] GET_UNIT_ADDRESS_DETAILS_ERROR',

  UPDATE_UNIT_ADDRESS_DETAILS = '[home] UPDATE_UNIT_ADDRESS_DETAILS',
  UPDATE_UNIT_ADDRESS_DETAILS_SUCCESS = '[home] UPDATE_UNIT_ADDRESS_DETAILS_SUCCESS',
  UPDATE_UNIT_ADDRESS_DETAILS_ERROR = '[home] UPDATE_UNIT_ADDRESS_DETAILS_ERROR',

  DELETE_UNIT_CONTACT_DETAILS = '[home] DELETE_UNIT_CONTACT_DETAILS',
  DELETE_UNIT_CONTACT_DETAILS_SUCCESS = '[home] DELETE_UNIT_CONTACT_DETAILS_SUCCESS',
  DELETE_UNIT_CONTACT_DETAILS_ERROR = '[home] DELETE_UNIT_CONTACT_DETAILS_ERROR',

  APPROVE_UNIT_DETAILS = '[home] APPROVE_UNIT_DETAILS',
  APPROVE_UNIT_DETAILS_SUCCESS = '[home] APPROVE_UNIT_DETAILS_SUCCESS',
  APPROVE_UNIT_DETAILS_ERROR = '[home] APPROVE_UNIT_DETAILS_ERROR',

  APPROVE_UNIT_FINANCE = '[home] APPROVE_UNIT_FINANCE',
  APPROVE_UNIT_FINANCE_SUCCESS = '[home] APPROVE_UNIT_FINANCE_SUCCESS',
  APPROVE_UNIT_FINANCE_ERROR = '[home] APPROVE_UNIT_FINANCE_ERROR',

  APPROVE_UNIT_ADDRESS = '[home] APPROVE_UNIT_ADDRESS',
  APPROVE_UNIT_ADDRESS_SUCCESS = '[home] APPROVE_UNIT_ADDRESS_SUCCESS',
  APPROVE_UNIT_ADDRESS_ERROR = '[home] APPROVE_UNIT_ADDRESS_ERROR',
}

/*export class ActionGetUnitFinanceDetails implements Action {
  readonly type = DetailsActionTypes.GET_UNIT_FINANCE_DETAILS;
  constructor(readonly payload: any) { }
}

export class ActionGetUnitFinanceDetailsSuccess implements Action {
  readonly type = DetailsActionTypes.GET_UNIT_FINANCE_DETAILS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetUnitFinanceDetailsError implements Action {
  readonly type = DetailsActionTypes.GET_UNIT_FINANCE_DETAILS_ERROR;
  constructor(readonly payload: any) { }
}*/


export class ActionGetUnitAddressDetails implements Action {
  readonly type = DetailsActionTypes.GET_UNIT_ADDRESS_DETAILS;
  constructor(readonly payload: any) { }
}

export class ActionGetUnitAddressDetailsSuccess implements Action {
  readonly type = DetailsActionTypes.GET_UNIT_ADDRESS_DETAILS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetUnitAddressDetailsError implements Action {
  readonly type = DetailsActionTypes.GET_UNIT_ADDRESS_DETAILS_ERROR;
  constructor(readonly payload: any) { }
}


export class ActionUpdateUnitAddressDetails implements Action {
  readonly type = DetailsActionTypes.UPDATE_UNIT_ADDRESS_DETAILS;
  constructor(readonly payload: any) { }
}

export class ActionUpdateUnitAddressDetailsSuccess implements Action {
  readonly type = DetailsActionTypes.UPDATE_UNIT_ADDRESS_DETAILS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionUpdateUnitAddressDetailsError implements Action {
  readonly type = DetailsActionTypes.UPDATE_UNIT_ADDRESS_DETAILS_ERROR;
  constructor(readonly payload: any) { }
}


export class ActionDeleteUnitContactDetails implements Action {
  readonly type = DetailsActionTypes.DELETE_UNIT_CONTACT_DETAILS;
  constructor(readonly payload: any) { }
}

export class ActionDeleteUnitContactDetailsSuccess implements Action {
  readonly type = DetailsActionTypes.DELETE_UNIT_CONTACT_DETAILS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionDeleteUnitContactDetailsError implements Action {
  readonly type = DetailsActionTypes.DELETE_UNIT_CONTACT_DETAILS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionUpdateUnitFinanceDetails implements Action {
  readonly type = DetailsActionTypes.UPDATE_UNIT_FINANCE_DETAILS;
  constructor(readonly payload: any) { }
}

export class ActionUpdateUnitFinanceDetailsSuccess implements Action {
  readonly type = DetailsActionTypes.UPDATE_UNIT_FINANCE_DETAILS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionUpdateUnitFinanceDetailsError implements Action {
  readonly type = DetailsActionTypes.UPDATE_UNIT_FINANCE_DETAILS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionResetUnitState implements Action {
  readonly type = DetailsActionTypes.RESET_UNIT_STATE;
  constructor(readonly payload: any) { }
}

export class ActionGetUnitDetails implements Action {
  readonly type = DetailsActionTypes.GET_UNIT_DETAILS;
  constructor(readonly payload: any) { }
}

export class ActionGetUnitDetailsSuccess implements Action {
  readonly type = DetailsActionTypes.GET_UNIT_DETAILS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetUnitDetailsError implements Action {
  readonly type = DetailsActionTypes.GET_UNIT_DETAILS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionUpdateUnitDetails implements Action {
  readonly type = DetailsActionTypes.UPDATE_UNIT_DETAILS;
  constructor(readonly payload: any) { }
}

export class ActionUpdateUnitDetailsSuccess implements Action {
  readonly type = DetailsActionTypes.UPDATE_UNIT_DETAILS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionUpdateUnitDetailsError implements Action {
  readonly type = DetailsActionTypes.UPDATE_UNIT_DETAILS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionGetUnitFinance implements Action {
  readonly type = DetailsActionTypes.GET_UNIT_FINANCE;
  constructor(readonly payload: any) { }
}

export class ActionGetUnitFinanceSuccess implements Action {
  readonly type = DetailsActionTypes.GET_UNIT_FINANCE_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetUnitFinanceError implements Action {
  readonly type = DetailsActionTypes.GET_UNIT_FINANCE_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionUpdateUnitFinance implements Action {
  readonly type = DetailsActionTypes.UPDATE_UNIT_FINANCE;
  constructor(readonly payload: any) { }
}

export class ActionUpdateUnitFinanceSuccess implements Action {
  readonly type = DetailsActionTypes.UPDATE_UNIT_FINANCE_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionUpdateUnitFinanceError implements Action {
  readonly type = DetailsActionTypes.UPDATE_UNIT_FINANCE_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionProceedToFinance implements Action {
  readonly type = DetailsActionTypes.PROCEED_TO_FINANCE;
  constructor(readonly payload: any) { }
}

export class ActionProceedToSpecialities implements Action {
  readonly type = DetailsActionTypes.PROCEED_TO_SPECIALITIES;
  constructor(readonly payload: any) { }
}


export class ActionProceedToUsers implements Action {
  readonly type = DetailsActionTypes.PROCEED_TO_USERS;
  constructor(readonly payload: any) { }
}

export class ActionProceedToPartners implements Action {
  readonly type = DetailsActionTypes.PROCEED_TO_PARTNERS;
  constructor(readonly payload: any) { }
}

export class ActionProceedToDoctors implements Action {
  readonly type = DetailsActionTypes.PROCEED_TO_DOCTORS;
  constructor(readonly payload: any) { }
}

export class ActionApproveUnitDetails implements Action {
  readonly type = DetailsActionTypes.APPROVE_UNIT_DETAILS;
  constructor(readonly payload: any) { }
}

export class ActionApproveUnitDetailsSuccess implements Action {
  readonly type = DetailsActionTypes.APPROVE_UNIT_DETAILS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionApproveUnitDetailsError implements Action {
  readonly type = DetailsActionTypes.APPROVE_UNIT_DETAILS_ERROR;
  constructor(readonly payload: any) { }
}


export class ActionApproveUnitFinance implements Action {
  readonly type = DetailsActionTypes.APPROVE_UNIT_FINANCE;
  constructor(readonly payload: any) { }
}

export class ActionApproveUnitFinanceSuccess implements Action {
  readonly type = DetailsActionTypes.APPROVE_UNIT_FINANCE_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionApproveUnitFinanceError implements Action {
  readonly type = DetailsActionTypes.APPROVE_UNIT_FINANCE_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionApproveUnitAddress implements Action {
  readonly type = DetailsActionTypes.APPROVE_UNIT_ADDRESS;
  constructor(readonly payload: any) { }
}

export class ActionApproveUnitAddressSuccess implements Action {
  readonly type = DetailsActionTypes.APPROVE_UNIT_ADDRESS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionApproveUnitAddressError implements Action {
  readonly type = DetailsActionTypes.APPROVE_UNIT_ADDRESS_ERROR;
  constructor(readonly payload: any) { }
}



export type DetailsActions =

  | ActionResetUnitState

  | ActionGetUnitDetails
  | ActionGetUnitDetailsSuccess
  | ActionGetUnitDetailsError

  | ActionUpdateUnitDetails
  | ActionUpdateUnitDetailsSuccess
  | ActionUpdateUnitDetailsError

  | ActionGetUnitFinance
  | ActionGetUnitFinanceSuccess
  | ActionGetUnitFinanceError

  | ActionUpdateUnitFinance
  | ActionUpdateUnitFinanceSuccess
  | ActionUpdateUnitFinanceError

  | ActionProceedToFinance
  | ActionProceedToSpecialities
  | ActionProceedToUsers
  | ActionProceedToPartners
  | ActionProceedToDoctors

  | ActionUpdateUnitFinanceDetails
  | ActionUpdateUnitFinanceDetailsSuccess
  | ActionUpdateUnitFinanceDetailsError

  | ActionGetUnitAddressDetails
  | ActionGetUnitAddressDetailsSuccess
  | ActionGetUnitAddressDetailsError

  | ActionUpdateUnitAddressDetails
  | ActionUpdateUnitAddressDetailsSuccess
  | ActionUpdateUnitAddressDetailsError

  | ActionDeleteUnitContactDetails
  | ActionDeleteUnitContactDetailsSuccess
  | ActionDeleteUnitContactDetailsError

  | ActionApproveUnitDetails
  | ActionApproveUnitDetailsSuccess
  | ActionApproveUnitDetailsError

  | ActionApproveUnitFinance
  | ActionApproveUnitFinanceSuccess
  | ActionApproveUnitFinanceError

  | ActionApproveUnitAddress
  | ActionApproveUnitAddressSuccess
  | ActionApproveUnitAddressError

  ;
