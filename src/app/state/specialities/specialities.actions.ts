import { Action } from '@ngrx/store';

export enum SpecialitiesActionTypes {

  ADD_BULK_DEPARTMENTS = '[Stock] Add Bulk Departments',
  ADD_BULK_DEPARTMENTS_SUCCESS = '[Stock] Add Bulk Departments Success',
  ADD_BULK_DEPARTMENTS_ERROR = '[Stock] Add Bulk Departments Error',

  GET_DEPARTMENTS = '[home] Get Departments',
  GET_DEPARTMENTS_SUCCESS = '[home] Get Departments Success',
  GET_DEPARTMENTS_ERROR = '[home] Get Departments Error',

  GET_DEPARTMENTS_BY_UNIT_ID = '[home] Get Departments By UnitId',
  GET_DEPARTMENTS_BY_UNIT_ID_SUCCESS = '[home] Get Departments By UnitId Success',
  GET_DEPARTMENTS_BY_UNIT_ID_ERROR = '[home] Get Departments By UnitId Error',

  UPDATE_DEPARTMENTS = '[Stock] Update Departments',
  UPDATE_DEPARTMENTS_SUCCESS = '[Stock] Update Departments Success',
  UPDATE_DEPARTMENTS_ERROR = '[Stock] Update Departments Error',

  DELETE_DEPARTMENT = '[Stock] Delete Department',
  DELETE_DEPARTMENT_SUCCESS = '[Stock] Delete Department Success',
  DELETE_DEPARTMENT_ERROR = '[Stock] Delete Department Error',

  ADD_SPECIALIZATIONS_TO_UNITS = '[home] Add Specializations to Unit',
  ADD_SPECIALIZATIONS_TO_UNITS_SUCCESS = '[home] Add Specializations to Unit Success',
  ADD_SPECIALIZATIONS_TO_UNITS_ERROR = '[home] Add Specializations to Unit Error',
  
  GET_UNIT_SPECIALITY_DETAILS = '[Current Client] GET_UNIT_SPECIALITY_DETAILS',
  GET_UNIT_SPECIALITY_DETAILS_SUCCESS = '[Current Client] GET_UNIT_SPECIALITY_DETAILS_SUCCESS',
  GET_UNIT_SPECIALITY_DETAILS_ERROR = '[Current Client] GET_UNIT_SPECIALITY_DETAILS_ERROR',

  APPROVE_UNIT_SPECIALITIES = '[Current Client] APPROVE_UNIT_SPECIALITIES',
  APPROVE_UNIT_SPECIALITIES_SUCCESS = '[Current Client] APPROVE_UNIT_SPECIALITIES_SUCCESS',
  APPROVE_UNIT_SPECIALITIES_ERROR = '[Current Client] APPROVE_UNIT_SPECIALITIES_ERROR',

  UPDATE_UNIT_SPECIALITY_DETAILS = '[Current Client] UPDATE_UNIT_SPECIALITY_DETAILS',
  UPDATE_UNIT_SPECIALITY_DETAILS_SUCCESS = '[Current Client] UPDATE_UNIT_SPECIALITY_DETAILS_SUCCESS',
  UPDATE_UNIT_SPECIALITY_DETAILS_ERROR = '[Current Client] UPDATE_UNIT_SPECIALITY_DETAILS_ERROR',

  PROCEED_FROM_SPECIALITIES = '[Current Client] PROCEED_FROM_SPECIALITIES',

  // GET_SPECIALITIES_APPROVALS = '[Current Client] GET_SPECIALITIES_APPROVALS',
  // GET_SPECIALITIES_APPROVALS_SUCCESS = '[Current Client] GET_SPECIALITIES_APPROVALS_SUCCESS',
  // GET_SPECIALITIES_APPROVALS_ERROR = '[Current Client] GET_SPECIALITIES_APPROVALS_ERROR',

  GET_SPECIALITIES_CURRENT_CLIENT = '[Current Client] GET_SPECIALITIES_CURRENT_CLIENT',
  GET_SPECIALITIES_CURRENT_CLIENT_SUCCESS = '[Current Client] GET_SPECIALITIES_CURRENT_CLIENT_SUCCESS',
  GET_SPECIALITIES_CURRENT_CLIENT_ERROR = '[Current Client] GET_SPECIALITIES_CURRENT_CLIENT_ERROR'

}


export class ActionUpdateDepartments implements Action {
  readonly type = SpecialitiesActionTypes.UPDATE_DEPARTMENTS;
  constructor(readonly payload: any) { }
}

export class ActionUpdateDepartmentsSuccess implements Action {
  readonly type = SpecialitiesActionTypes.UPDATE_DEPARTMENTS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionUpdateDepartmentsError implements Action {
  readonly type = SpecialitiesActionTypes.UPDATE_DEPARTMENTS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionGetDepartments implements Action {
  readonly type = SpecialitiesActionTypes.GET_DEPARTMENTS;
  constructor(readonly payload: any) { }
}

export class ActionGetDepartmentsSuccess implements Action {
  readonly type = SpecialitiesActionTypes.GET_DEPARTMENTS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetDepartmentsError implements Action {
  readonly type = SpecialitiesActionTypes.GET_DEPARTMENTS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionGetDepartmentsByUnitId implements Action {
  readonly type = SpecialitiesActionTypes.GET_DEPARTMENTS_BY_UNIT_ID;
  constructor(readonly payload: any) { }
}

export class ActionGetDepartmentsByUnitIdSuccess implements Action {
  readonly type = SpecialitiesActionTypes.GET_DEPARTMENTS_BY_UNIT_ID_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetDepartmentsByUnitIdError implements Action {
  readonly type = SpecialitiesActionTypes.GET_DEPARTMENTS_BY_UNIT_ID_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionDeleteDepartment implements Action {
  readonly type = SpecialitiesActionTypes.DELETE_DEPARTMENT;
  constructor(readonly payload: any) { }
}

export class ActionDeleteDepartmentSuccess implements Action {
  readonly type = SpecialitiesActionTypes.DELETE_DEPARTMENT_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionDeleteDepartmentError implements Action {
  readonly type = SpecialitiesActionTypes.DELETE_DEPARTMENT_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionUpdateUnitSpecialityDetails implements Action {
  readonly type = SpecialitiesActionTypes.UPDATE_UNIT_SPECIALITY_DETAILS;
  constructor(readonly payload: any) { }
}

export class ActionUpdateUnitSpecialityDetailsSuccess implements Action {
  readonly type = SpecialitiesActionTypes.UPDATE_UNIT_SPECIALITY_DETAILS_SUCCESS;
  constructor(readonly payload: any) { }
}


export class ActionUpdateUnitSpecialityDetailsError implements Action {
  readonly type = SpecialitiesActionTypes.UPDATE_UNIT_SPECIALITY_DETAILS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionGetUnitSpecialityDetails implements Action {
  readonly type = SpecialitiesActionTypes.GET_UNIT_SPECIALITY_DETAILS;
  constructor(readonly payload: any) { }
}

export class ActionGetUnitSpecialityDetailsSuccess implements Action {
  readonly type = SpecialitiesActionTypes.GET_UNIT_SPECIALITY_DETAILS_SUCCESS;
  constructor(readonly payload: any) { }
}
export class ActionGetUnitSpecialityDetailsError implements Action {
  readonly type = SpecialitiesActionTypes.GET_UNIT_SPECIALITY_DETAILS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionApproveUnitSpeciality implements Action {
  readonly type = SpecialitiesActionTypes.APPROVE_UNIT_SPECIALITIES;
  constructor(readonly payload: any) { }
}

export class ActionApproveUnitSpecialitySuccess implements Action {
  readonly type = SpecialitiesActionTypes.APPROVE_UNIT_SPECIALITIES_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionApproveUnitSpecialityError implements Action {
  readonly type = SpecialitiesActionTypes.APPROVE_UNIT_SPECIALITIES_ERROR;
  constructor(readonly payload: any) { }
}
export class ActionAddSpecializationsToUnit implements Action {
  readonly type = SpecialitiesActionTypes.ADD_SPECIALIZATIONS_TO_UNITS;
  constructor(readonly payload: any) { }
}

export class ActionAddSpecializationsToUnitSuccess implements Action {
  readonly type = SpecialitiesActionTypes.ADD_SPECIALIZATIONS_TO_UNITS_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionAddSpecializationsToUnitError implements Action {
  readonly type = SpecialitiesActionTypes.ADD_SPECIALIZATIONS_TO_UNITS_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionProceedFromSpecialities implements Action {
  readonly type = SpecialitiesActionTypes.PROCEED_FROM_SPECIALITIES;
  constructor(readonly payload: any) { }
}


export class ActionGetSpecialitiesCurrentClient implements Action {
  readonly type = SpecialitiesActionTypes.GET_SPECIALITIES_CURRENT_CLIENT;
  constructor(readonly payload: any) { }
}

export class ActionGetSpecialitiesCurrentClientSuccess implements Action {
  readonly type = SpecialitiesActionTypes.GET_SPECIALITIES_CURRENT_CLIENT_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetSpecialitiesCurrentClientError implements Action {
  readonly type = SpecialitiesActionTypes.GET_SPECIALITIES_CURRENT_CLIENT_ERROR;
  constructor(readonly payload: any) { }
}





export type SpecialitiesActions =

  | ActionUpdateDepartments
  | ActionUpdateDepartmentsSuccess
  | ActionUpdateDepartmentsError

  | ActionGetDepartments
  | ActionGetDepartmentsSuccess
  | ActionGetDepartmentsError

  | ActionDeleteDepartment
  | ActionDeleteDepartmentSuccess
  | ActionDeleteDepartmentError


  | ActionGetDepartmentsByUnitId
  | ActionGetDepartmentsByUnitIdSuccess
  | ActionGetDepartmentsByUnitIdError

  | ActionAddSpecializationsToUnit
  | ActionAddSpecializationsToUnitSuccess
  | ActionAddSpecializationsToUnitError

  | ActionGetUnitSpecialityDetails
  | ActionGetUnitSpecialityDetailsSuccess
  | ActionGetUnitSpecialityDetailsError

  | ActionUpdateUnitSpecialityDetails
  | ActionUpdateUnitSpecialityDetailsSuccess
  | ActionUpdateUnitSpecialityDetailsError
  
  | ActionProceedFromSpecialities

  | ActionApproveUnitSpeciality
  | ActionApproveUnitSpecialitySuccess
  | ActionApproveUnitSpecialityError

  | ActionGetSpecialitiesCurrentClient
  | ActionGetSpecialitiesCurrentClientSuccess
  | ActionGetSpecialitiesCurrentClientError

  ;
