import { Action } from '@ngrx/store';

export enum PartnersActionTypes {

  GET_PARTNERS = '[Stock] Get Partners',
  GET_PARTNERS_SUCCESS = '[Stock] Get Partners Success',
  GET_PARTNERS_ERROR = '[Stock] Get Partners Error',


  CREATE_PARTNER = '[Stock] Create Partner',
  CREATE_PARTNER_SUCCESS = '[Stock] Create Partner Success',
  CREATE_PARTNER_ERROR = '[Stock] Create Partner Error',


  //Partners Data
  UPDATE_PARTNERS = '[Stock] Update Partners',
  UPDATE_PARTNERS_SUCCESS = '[Stock] Update Partners Success',
  UPDATE_PARTNERS_ERROR = '[Stock] Update Partners Error',

  DELETE_PARTNER = '[Stock] Delete Partner',
  DELETE_PARTNER_SUCCESS= '[Stock] Delete Partner Success',
  DELETE_PARTNER_ERROR = '[Stock] Delete Partner Error',

  GET_PARTNER_DETAILS = '[Stock] Get Partner Details',
  GET_PARTNER_SUCCESS = '[Stock] Get Partner Success',
  GET_PARTNER_ERROR = '[Stock] Get Partner Error',

  UPDATE_PARTNER_FINANCE = '[Stock] Update Partner Finance',
  UPDATE_PARTNER_FINANCE_SUCCESS = '[Stock] Update Partner Finance Success',
  UPDATE_PARTNER_FINANCE_ERROR = '[Stock] Update Partner Finance Error',

  GET_PARTNER_FINANCE_DATA =  '[Partners] Get Partner Finance Data ',
  GET_PARTNER_FINANCE_DATA_SUCCESS = '[Partners] Get Partner Finance Data Success',
  GET_PARTNER_FINANCE_DATA_ERROR = '[Partners] Get Partner Finance Data Error',

  GET_PARTNER_CONTACT =  '[Partners] Get Partner Contact ',
  GET_PARTNER_CONTACT_SUCCESS = '[Partners] Get Partner Contact Success',
  GET_PARTNER_CONTACT_ERROR = '[Partners] Get Partner Contact Error',

  UPDATE_PARTNER_CONTACT =  '[Partners] Update Partner Contact ',
  UPDATE_PARTNER_CONTACT_SUCCESS = '[Partners] Update Partner Contact Success',
  UPDATE_PARTNER_CONTACT_ERROR = '[Partners] Update Partner Contact Error',

  DELETE_PARTNER_CONTACT =  '[Partners] Delete Partner Contact ',
  DELETE_PARTNER_CONTACT_SUCCESS = '[Partners] Delete Partner Contact Success',
  DELETE_PARTNER_CONTACT_ERROR = '[Partners] Delete Partner Contact Error',

  
  GET_PARTNER_ADDRESS  = '[Partners] Get Partner Address',
  GET_PARTNER_ADDRESS_SUCCESS = '[Partners] Get Partner Address Success',
  GET_PARTNER_ADDRESS_ERROR = '[Partners] Get Partner Address Error',

  UPDATE_PARTNER_ADDRESS =  '[Partners] Update Partner Address ',
  UPDATE_PARTNER_ADDRESS_SUCCESS = '[Partners] Update Partner Address Success',
  UPDATE_PARTNER_ADDRESS_ERROR = '[Partners] Update Partner Address Error',

  PROCEED_FROM_PARTNER_CONTACTS = '[Partners] Proceed From Partner Contacts',

  APPROVE_PARTNER_DETAILS = '[Partners] Approve Partner Details',
  APPROVE_PARTNER_DETAILS_SUCCESS = '[Partners] Approve Partner Details Success',
  APPROVE_PARTNER_DETAILS_ERROR = '[Partners] Approve Partner Details Error',

  APPROVE_PARTNER_ADDRESS = '[Partners] Approve Partner Address',
  APPROVE_PARTNER_ADDRESS_SUCCESS = '[Partners] Approve Partner Address Success',
  APPROVE_PARTNER_ADDRESS_ERROR = '[Partners] Approve Partner Address Error',


  APPROVE_PARTNER_FINANCE = '[Partners] Approve Partner Finance',
  APPROVE_PARTNER_FINANCE_SUCCESS = '[Partners] Approve Partner Finance Success',
  APPROVE_PARTNER_FINANCE_ERROR = '[Partners] Approve Partner Finance Error',

  APPROVE_PARTNER_CONTACT = '[Partners] Approve Partner Contact',
  APPROVE_PARTNER_CONTACT_SUCCESS = '[Partners] Approve Partner Contact Success',
  APPROVE_PARTNER_CONTACT_ERROR = '[Partners] Approve Partner Contact Error',

}

export class ActionCreatePartner implements Action {
  readonly type = PartnersActionTypes.CREATE_PARTNER;
  constructor(readonly payload: any) { }
}

export class ActionCreatePartnerSuccess implements Action {
  readonly type = PartnersActionTypes.CREATE_PARTNER_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionCreatePartnerError implements Action {
  readonly type = PartnersActionTypes.CREATE_PARTNER_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionGetPartners implements Action {
  readonly type = PartnersActionTypes.GET_PARTNERS;
  constructor(readonly payload: any) { }
}

export class ActionGetPartnersSuccess implements Action {
  readonly type = PartnersActionTypes.GET_PARTNERS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetPartnersError implements Action {
  readonly type = PartnersActionTypes.GET_PARTNERS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionGetPartnersByUnitId implements Action {
  readonly type = PartnersActionTypes.GET_PARTNERS;
  constructor(readonly payload: any) { }
}

export class ActionGetPartnersByUnitIdSuccess implements Action {
  readonly type = PartnersActionTypes.GET_PARTNERS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetPartnersByUnitIdError implements Action {
  readonly type = PartnersActionTypes.GET_PARTNERS_ERROR;
  constructor(readonly payload: any) { }
}
export class ActionDeletePartner implements Action {
  readonly type = PartnersActionTypes.DELETE_PARTNER;
  constructor(readonly payload: any) { }
}

export class ActionDeletePartnerSuccess implements Action {
  readonly type = PartnersActionTypes.DELETE_PARTNER_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionDeletePartnerError implements Action {
  readonly type = PartnersActionTypes.DELETE_PARTNER_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionGetPartnerDetails implements Action {
  readonly type = PartnersActionTypes.GET_PARTNER_DETAILS
  constructor(readonly payload: any) { }
}

export class ActionGetPartnerDetailsSuccess implements Action {
  readonly type = PartnersActionTypes.GET_PARTNER_SUCCESS
  constructor(readonly payload: any) { }
}

export class ActionGetPartnerDetailsError implements Action {
  readonly type = PartnersActionTypes.GET_PARTNER_ERROR
  constructor(readonly payload: any) { }
}

export class ActionGetPartnerFinanceData implements Action {
  readonly type = PartnersActionTypes.GET_PARTNER_FINANCE_DATA
  constructor(readonly payload: any) { }
}
export class ActionGetPartnerFinanceDataSuccess implements Action {
  readonly type = PartnersActionTypes.GET_PARTNER_FINANCE_DATA_SUCCESS
  constructor(readonly payload: any) { }
}
export class ActionGetPartnerFinanceDataError implements Action {
  readonly type = PartnersActionTypes.GET_PARTNER_FINANCE_DATA_ERROR
  constructor(readonly payload: any) { }
}

export class ActionUpdatePartnerContacts implements Action {
  readonly type = PartnersActionTypes.UPDATE_PARTNER_CONTACT;
  constructor(readonly payload: any) { }
}

export class ActionUpdatePartnerContactsSuccess implements Action {
  readonly type = PartnersActionTypes.UPDATE_PARTNER_CONTACT_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionUpdatePartnerContactsError implements Action {
  readonly type = PartnersActionTypes.UPDATE_PARTNER_CONTACT_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionDeletePartnerContacts implements Action {
  readonly type = PartnersActionTypes.DELETE_PARTNER_CONTACT;
  constructor(readonly payload: any) { }
}

export class ActionDeletePartnerContactsSuccess implements Action {
  readonly type = PartnersActionTypes.DELETE_PARTNER_CONTACT_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionDeletePartnerContactsError implements Action {
  readonly type = PartnersActionTypes.DELETE_PARTNER_CONTACT_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionGetPartnerContacts implements Action {
  readonly type = PartnersActionTypes.GET_PARTNER_CONTACT;
  constructor(readonly payload: any) { }
}

export class ActionGetPartnerContactsSuccess implements Action {
  readonly type = PartnersActionTypes.GET_PARTNER_CONTACT_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetPartnerContactsError implements Action {
  readonly type = PartnersActionTypes.GET_PARTNER_CONTACT_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionUpdatePartnerFinance implements Action {
  readonly type = PartnersActionTypes.UPDATE_PARTNER_FINANCE;
  constructor(readonly payload: any) { }
}

export class ActionUpdatePartnerFinanceSuccess implements Action {
  readonly type = PartnersActionTypes.UPDATE_PARTNER_FINANCE_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionUpdatePartnerFinanceError implements Action {
  readonly type = PartnersActionTypes.UPDATE_PARTNER_FINANCE_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionGetPartnerAddress implements Action {
  readonly type = PartnersActionTypes.GET_PARTNER_ADDRESS;
  constructor(readonly payload: any) { }
}

export class ActionGetPartnerAddressSuccess implements Action {
  readonly type = PartnersActionTypes.GET_PARTNER_ADDRESS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetPartnerAddressError implements Action {
  readonly type = PartnersActionTypes.GET_PARTNER_ADDRESS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionUpdatePartnerAddress implements Action {
  readonly type = PartnersActionTypes.UPDATE_PARTNER_ADDRESS;
  constructor(readonly payload: any) { }
}

export class ActionUpdatePartnerAddressSuccess implements Action {
  readonly type = PartnersActionTypes.UPDATE_PARTNER_ADDRESS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionUpdatePartnerAddressError implements Action {
  readonly type = PartnersActionTypes.UPDATE_PARTNER_ADDRESS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionProceedFromPartnerContacts implements Action {
  readonly type = PartnersActionTypes.PROCEED_FROM_PARTNER_CONTACTS;
  constructor(readonly payload: any) { }
}

export class ActionApprovePartnerDetails implements Action {
  readonly type = PartnersActionTypes.APPROVE_PARTNER_DETAILS;
  constructor(readonly payload: any) { }
}

export class ActionApprovePartnerDetailsSuccess implements Action {
  readonly type = PartnersActionTypes.APPROVE_PARTNER_DETAILS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionApprovePartnerDetailsError implements Action {
  readonly type = PartnersActionTypes.APPROVE_PARTNER_DETAILS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionApprovePartnerAddress implements Action {
  readonly type = PartnersActionTypes.APPROVE_PARTNER_ADDRESS;
  constructor(readonly payload: any) { }
}

export class ActionApprovePartnerAddressSuccess implements Action {
  readonly type = PartnersActionTypes.APPROVE_PARTNER_ADDRESS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionApprovePartnerAddressError implements Action {
  readonly type = PartnersActionTypes.APPROVE_PARTNER_ADDRESS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionApprovePartnerFinance implements Action {
  readonly type = PartnersActionTypes.APPROVE_PARTNER_FINANCE;
  constructor(readonly payload: any) { }
}

export class ActionApprovePartnerFinanceSuccess implements Action {
  readonly type = PartnersActionTypes.APPROVE_PARTNER_FINANCE_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionApprovePartnerFinanceError implements Action {
  readonly type = PartnersActionTypes.APPROVE_PARTNER_FINANCE_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionApprovePartnerContact implements Action {
  readonly type = PartnersActionTypes.APPROVE_PARTNER_CONTACT;
  constructor(readonly payload: any) { }
}

export class ActionApprovePartnerContactSuccess implements Action {
  readonly type = PartnersActionTypes.APPROVE_PARTNER_CONTACT_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionApprovePartnerContactError implements Action {
  readonly type = PartnersActionTypes.APPROVE_PARTNER_CONTACT_ERROR;
  constructor(readonly payload: any) { }
}

export type PartnersActions =

| ActionCreatePartner
| ActionCreatePartnerSuccess
| ActionCreatePartnerError

| ActionGetPartners
| ActionGetPartnersSuccess
| ActionGetPartnersError

| ActionGetPartnersByUnitId
| ActionGetPartnersByUnitIdSuccess
| ActionGetPartnersByUnitIdError

| ActionDeletePartner
| ActionDeletePartnerSuccess
| ActionDeletePartnerError

| ActionGetPartnerDetails
| ActionGetPartnerDetailsSuccess
| ActionGetPartnerDetailsError

| ActionUpdatePartnerFinance
| ActionUpdatePartnerFinanceSuccess
| ActionUpdatePartnerFinanceError

| ActionGetPartnerFinanceData
| ActionGetPartnerFinanceDataSuccess
| ActionGetPartnerFinanceDataError

| ActionGetPartnerContacts
| ActionGetPartnerContactsSuccess
| ActionGetPartnerContactsError

| ActionUpdatePartnerContacts
| ActionUpdatePartnerContactsSuccess
| ActionUpdatePartnerContactsError

| ActionDeletePartnerContacts
| ActionDeletePartnerContactsSuccess
| ActionDeletePartnerContactsError


| ActionGetPartnerAddress
| ActionGetPartnerAddressSuccess
| ActionGetPartnerAddressError

| ActionUpdatePartnerAddress
| ActionUpdatePartnerAddressSuccess
| ActionUpdatePartnerAddressError

| ActionProceedFromPartnerContacts

| ActionApprovePartnerDetails
| ActionApprovePartnerDetailsSuccess
| ActionApprovePartnerDetailsError


| ActionApprovePartnerAddress
| ActionApprovePartnerAddressSuccess
| ActionApprovePartnerAddressError

| ActionApprovePartnerFinance
| ActionApprovePartnerFinanceSuccess
| ActionApprovePartnerFinanceError

| ActionApprovePartnerContact
| ActionApprovePartnerContactSuccess
| ActionApprovePartnerContactError


  ;
