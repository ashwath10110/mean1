import { Action } from '@ngrx/store';

export enum ApprovalsActionTypes {
  GET_APPROVALS = '[clients] GET_APPROVALS',
  GET_APPROVALS_SUCCESS = '[clients] GET_APPROVALS_SUCCESS',
  GET_APPROVALS_ERROR = '[clients] GET_APPROVALS_ERROR',
  REJECT_APPROVAL = '[clients] REJECT_APPROVAL',
  REJECT_APPROVAL_SUCCESS = '[clients] REJECT_APPROVAL_SUCCESS',
  REJECT_APPROVAL_ERROR = '[clients] REJECT_APPROVAL_ERROR',
  SET_CURRENT_APPROVAL = '[clients] SET_CURRENT_APPROVAL',
  SET_CURRENT_APPROVED_GET_DATA = '[clients] SET_CURRENT_APPROVED_GET_DATA',
  BULK_APPROVE = '[clients] BULK_APPROVE',
  BULK_APPROVE_SUCCESS = '[clients] BULK_APPROVE_SUCCESS',
  BULK_APPROVE_ERROR = '[clients] BULK_APPROVE_ERROR',
  BULK_REJECT = '[clients] BULK_REJECT',
  BULK_REJECT_SUCCESS = '[clients] BULK_REJECT_SUCCESS',
  BULK_REJECT_ERROR = "[clients] BULK_REJECT_ERROR"
}

export class ActionGetApprovals implements Action {
  readonly type = ApprovalsActionTypes.GET_APPROVALS;
  constructor(readonly payload: any) { }
}

export class ActionGetApprovalsSuccess implements Action {
  readonly type = ApprovalsActionTypes.GET_APPROVALS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetApprovalsError implements Action {
  readonly type = ApprovalsActionTypes.GET_APPROVALS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionRejectApprovals implements Action {
  readonly type = ApprovalsActionTypes.REJECT_APPROVAL;
  constructor(readonly payload: any) { }
}

export class ActionRejectApprovalsSuccess implements Action {
  readonly type = ApprovalsActionTypes.REJECT_APPROVAL_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionRejectApprovalsError implements Action {
  readonly type = ApprovalsActionTypes.REJECT_APPROVAL_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionSetCurrentApproval implements Action {
  readonly type = ApprovalsActionTypes.SET_CURRENT_APPROVAL;
  constructor(readonly payload: any) { }
}

export class ActionSetCurrentApprovedData implements Action {
  readonly type = ApprovalsActionTypes.SET_CURRENT_APPROVED_GET_DATA;
  constructor(readonly payload: any) { }
}

export class ActionBulkApprove implements Action {
  readonly type = ApprovalsActionTypes.BULK_APPROVE;
  constructor(readonly payload: any) { }
}

export class ActionBulkApproveSuccess implements Action {
  readonly type = ApprovalsActionTypes.BULK_APPROVE_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionBulkApproveError implements Action {
  readonly type = ApprovalsActionTypes.BULK_APPROVE_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionBulkReject implements Action {
  readonly type = ApprovalsActionTypes.BULK_REJECT;
  constructor(readonly payload: any) { }
}

export class ActionBulkRejectSuccess implements Action {
  readonly type = ApprovalsActionTypes.BULK_REJECT_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionBulkRejectError implements Action {
  readonly type = ApprovalsActionTypes.BULK_REJECT_ERROR;
  constructor(readonly payload: any) { }
}

export type ApprovalsActions =

  | ActionGetApprovals
  | ActionGetApprovalsSuccess
  | ActionGetApprovalsError

  | ActionRejectApprovals
  | ActionRejectApprovalsSuccess
  | ActionRejectApprovalsError

  | ActionSetCurrentApproval
  | ActionSetCurrentApprovedData

  | ActionBulkApprove
  | ActionBulkApproveSuccess
  | ActionBulkApproveError

  | ActionBulkReject
  | ActionBulkRejectSuccess
  | ActionBulkRejectError

  ;
