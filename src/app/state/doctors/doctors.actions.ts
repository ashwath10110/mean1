import { Action } from '@ngrx/store';

export enum DoctorsActionTypes {
  GET_DOCTORS = '[doctors] GET_DOCTORS',
  GET_DOCTORS_SUCCESS = '[doctors] GET_DOCTORS_SUCCESS',
  GET_DOCTORS_ERROR = '[doctors] GET_DOCTORS_ERROR',

  GET_DOCTORS_BY_UNIT_ID = '[doctors] GET_DOCTORS_BY_UNIT_ID',
  GET_DOCTORS_BY_UNIT_ID_SUCCESS = '[doctors] GET_DOCTORS_BY_UNIT_ID_SUCCESS',
  GET_DOCTORS_BY_UNIT_ID_ERROR = '[doctors] GET_DOCTORS_BY_UNIT_ID_ERROR',

  UPDATE_DOCTORS = '[doctors] UPDATE_DOCTORS',
  UPDATE_DOCTORS_SUCCESS = '[doctors] UPDATE_DOCTORS_SUCCESS',
  UPDATE_DOCTORS_ERROR = '[doctors] UPDATE_DOCTORS_ERROR',

  DELETE_DOCTORS = '[doctors] DELETE_DOCTORS',
  DELETE_DOCTORS_SUCCESS = '[doctors] DELETE_DOCTORS_SUCCESS',
  DELETE_DOCTORS_ERROR = '[doctors] DELETE_DOCTORS_ERROR',

  
  APPROVE_UNIT_DOCTORS = '[doctors] APPROVE_UNIT_DOCTORS',
  APPROVE_UNIT_DOCTORS_SUCCESS = '[doctors] APPROVE_UNIT_DOCTORS_SUCCESS',
  APPROVE_UNIT_DOCTORS_ERROR = '[doctors] APPROVE_UNIT_DOCTORS_ERROR',

  ADD_DOCTORS_TO_UNIT_ID = '[home] ADD_DOCTORS_TO_UNIT_ID',
  ADD_DOCTORS_TO_UNIT_ID_SUCCESS = '[home] ADD_DOCTORS_TO_UNIT_ID_SUCCESS',
  ADD_DOCTORS_TO_UNIT_ID_ERROR = '[home] ADD_DOCTORS_TO_UNIT_ID_ERROR',

  REMOVE_DOCTORS_FROM_UNIT = '[home] REMOVE_DOCTORS_FROM_UNIT',
  REMOVE_DOCTORS_FROM_UNIT_SUCCESS = '[home] REMOVE_DOCTORS_FROM_UNIT_SUCCESS',
  REMOVE_DOCTORS_FROM_UNIT_ERROR = '[home] REMOVE_DOCTORS_FROM_UNIT_ERROR',

  ADD_DOCTORS = '[home] ADD_DOCTORS',
  ADD_DOCTORS_SUCCESS = '[home] ADD_DOCTORS_SUCCESS',
  ADD_DOCTORS_ERROR = '[home] ADD_DOCTORS_ERROR',

  ADD_MORE_DOCTORS = '[home] ADD_MORE_DOCTORS',

  REMOVE_DOCTOR_FROM_DEPARTMENT = '[Stock] Remove Doctor from Department',
  REMOVE_DOCTOR_FROM_DEPARTMENT_SUCCESS = '[Stock] Remove Doctor from Department Success',
  REMOVE_DOCTOR_FROM_DEPARTMENT_ERROR = '[Stock] Remove Doctor from Department Error',

  GET_DOCTOR_BY_DOC_ID = '[home] GET_DOCTOR_BY_DOC_ID',
  GET_DOCTOR_BY_DOC_ID_SUCCESS = '[home] GET_DOCTOR_BY_DOC_ID_SUCCESS',
  GET_DOCTOR_BY_DOC_ID_ERROR = '[home] GET_DOCTOR_BY_DOC_ID_ERROR',

}


export class ActionGetDoctors implements Action {
  readonly type = DoctorsActionTypes.GET_DOCTORS;
  constructor(readonly payload: any) { }
}

export class ActionGetDoctorsSuccess implements Action {
  readonly type = DoctorsActionTypes.GET_DOCTORS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetDoctorsError implements Action {
  readonly type = DoctorsActionTypes.GET_DOCTORS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionGetDoctorsByUnitId implements Action {
  readonly type = DoctorsActionTypes.GET_DOCTORS_BY_UNIT_ID;
  constructor(readonly payload: any) { }
}

export class ActionGetDoctorsByUnitIdSuccess implements Action {
  readonly type = DoctorsActionTypes.GET_DOCTORS_BY_UNIT_ID_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetDoctorsByUnitIdError implements Action {
  readonly type = DoctorsActionTypes.GET_DOCTORS_BY_UNIT_ID_ERROR;
  constructor(readonly payload: any) { }
}


export class ActionUpdateDoctors implements Action {
  readonly type = DoctorsActionTypes.UPDATE_DOCTORS;
  constructor(readonly payload: any) { }
}

export class ActionUpdateDoctorsSuccess implements Action {
  readonly type = DoctorsActionTypes.UPDATE_DOCTORS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionUpdateDoctorsError implements Action {
  readonly type = DoctorsActionTypes.UPDATE_DOCTORS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionDeleteDoctors implements Action {
  readonly type = DoctorsActionTypes.DELETE_DOCTORS;
  constructor(readonly payload: any) { }
}

export class ActionDeleteDoctorsSuccess implements Action {
  readonly type = DoctorsActionTypes.DELETE_DOCTORS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionDeleteDoctorsError implements Action {
  readonly type = DoctorsActionTypes.DELETE_DOCTORS_ERROR;
  constructor(readonly payload: any) { }
}


export class ActionRemoveDoctorFromDepartment implements Action {
  readonly type = DoctorsActionTypes.REMOVE_DOCTOR_FROM_DEPARTMENT;
  constructor(readonly payload: any) { }
}

export class ActionRemoveDoctorFromDepartmentSuccess implements Action {
  readonly type = DoctorsActionTypes.REMOVE_DOCTOR_FROM_DEPARTMENT_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionRemoveDoctorFromDepartmentError implements Action {
  readonly type = DoctorsActionTypes.REMOVE_DOCTOR_FROM_DEPARTMENT_ERROR;
  constructor(readonly payload: any) { }
}


export class ActionAddDoctorsToUnitId implements Action {
  readonly type = DoctorsActionTypes.ADD_DOCTORS_TO_UNIT_ID;
  constructor(readonly payload: any) { }
}

export class ActionAddDoctorsToUnitIdSuccess implements Action {
  readonly type = DoctorsActionTypes.ADD_DOCTORS_TO_UNIT_ID_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionAddDoctorsToUnitIdError implements Action {
  readonly type = DoctorsActionTypes.ADD_DOCTORS_TO_UNIT_ID_ERROR;
  constructor(readonly payload: any) { }
}


export class ActionGetDoctorByDocId implements Action {
  readonly type = DoctorsActionTypes.GET_DOCTOR_BY_DOC_ID;
  constructor(readonly payload: any) { }
}

export class ActionGetDoctorByDocIdSuccess implements Action {
  readonly type = DoctorsActionTypes.GET_DOCTOR_BY_DOC_ID_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetDoctorByDocIdError implements Action {
  readonly type = DoctorsActionTypes.GET_DOCTOR_BY_DOC_ID_ERROR;
  constructor(readonly payload: any) { }
}



export class ActionRemoveDoctorFromUnit implements Action {
  readonly type = DoctorsActionTypes.REMOVE_DOCTORS_FROM_UNIT;
  constructor(readonly payload: any) { }
}

export class ActionRemoveDoctorFromUnitSuccess implements Action {
  readonly type = DoctorsActionTypes.REMOVE_DOCTORS_FROM_UNIT_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionRemoveDoctorFromUnitError implements Action {
  readonly type = DoctorsActionTypes.REMOVE_DOCTORS_FROM_UNIT_ERROR;
  constructor(readonly payload: any) { }
}


export class ActionAddDoctors implements Action {
  readonly type = DoctorsActionTypes.ADD_DOCTORS;
  constructor(readonly payload: any) { }
}

export class ActionAddDoctorsSuccess implements Action {
  readonly type = DoctorsActionTypes.ADD_DOCTORS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionAddDoctorsError implements Action {
  readonly type = DoctorsActionTypes.ADD_DOCTORS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionAddMoreDoctor implements Action {
  readonly type = DoctorsActionTypes.ADD_MORE_DOCTORS;
  constructor(readonly payload: any) { }
}

export class ActionApproveUnitDoctor implements Action {
  readonly type = DoctorsActionTypes.APPROVE_UNIT_DOCTORS;
  constructor(readonly payload: any) { }
}

export class ActionApproveUnitDoctorSuccess implements Action {
  readonly type = DoctorsActionTypes.APPROVE_UNIT_DOCTORS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionApproveUnitDoctorError implements Action {
  readonly type = DoctorsActionTypes.APPROVE_UNIT_DOCTORS_ERROR;
  constructor(readonly payload: any) { }
}


export type DoctorActions =

  | ActionGetDoctors
  | ActionGetDoctorsSuccess
  | ActionGetDoctorsError

  | ActionUpdateDoctors
  | ActionUpdateDoctorsSuccess
  | ActionUpdateDoctorsError

  | ActionDeleteDoctors
  | ActionDeleteDoctorsSuccess
  | ActionDeleteDoctorsError

  | ActionGetDoctorsByUnitId
  | ActionGetDoctorsByUnitIdSuccess
  | ActionGetDoctorsByUnitIdError


  | ActionAddDoctorsToUnitId
  | ActionAddDoctorsToUnitIdSuccess
  | ActionAddDoctorsToUnitIdError

  | ActionRemoveDoctorFromUnit
  | ActionRemoveDoctorFromUnitSuccess
  | ActionRemoveDoctorFromUnitError

  | ActionAddDoctors
  | ActionAddDoctorsSuccess
  | ActionAddDoctorsError

  | ActionRemoveDoctorFromDepartment
  | ActionRemoveDoctorFromDepartmentSuccess
  | ActionRemoveDoctorFromDepartmentError

  | ActionAddMoreDoctor

  | ActionApproveUnitDoctor
  | ActionApproveUnitDoctorSuccess
  | ActionApproveUnitDoctorError

  | ActionGetDoctorByDocId
  | ActionGetDoctorByDocIdSuccess
  | ActionGetDoctorByDocIdError

  ;
