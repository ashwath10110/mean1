import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';


import { SpecialitiesActionTypes, ActionUpdateUnitSpecialityDetails, ActionGetUnitSpecialityDetails, ActionGetUnitSpecialityDetailsSuccess, ActionGetUnitSpecialityDetailsError, ActionUpdateUnitSpecialityDetailsSuccess, ActionUpdateUnitSpecialityDetailsError, ActionAddSpecializationsToUnit, ActionAddSpecializationsToUnitSuccess, ActionAddSpecializationsToUnitError, ActionGetDepartmentsByUnitIdSuccess, ActionGetDepartmentsByUnitIdError, ActionGetDepartmentsByUnitId, ActionGetDepartmentsError, ActionGetDepartmentsSuccess, ActionGetDepartments , ActionApproveUnitSpecialityError, ActionApproveUnitSpecialitySuccess, ActionApproveUnitSpeciality, ActionGetSpecialitiesCurrentClient, ActionGetSpecialitiesCurrentClientSuccess, ActionGetSpecialitiesCurrentClientError } from './specialities.actions';

import { SpecialitiesService } from './specialities.service';
import { AppService } from '@app/app/app.service';



@Injectable()
export class SpecialitiesEffects {

  constructor(
    private actions$: Actions < Action > ,
    private service: SpecialitiesService,
    private appService: AppService
  ) {}

  handleError(error) {
    this.appService.logError(error, true);
  }

  @Effect()
  getAllDepartments = this.actions$.pipe(
    ofType < ActionGetDepartments > (SpecialitiesActionTypes.GET_DEPARTMENTS),
    switchMap((action: ActionGetDepartments) =>
      this.service
      .getAllDepartments()
      .pipe(
        map(res => new ActionGetDepartmentsSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new ActionGetDepartmentsError({ error }))
        })
      )
    )
  );

  @Effect()
  getSpecialitiesCurrentClient = this.actions$.pipe(
    ofType < ActionGetSpecialitiesCurrentClient > (SpecialitiesActionTypes.GET_SPECIALITIES_CURRENT_CLIENT),
    switchMap((action: ActionGetSpecialitiesCurrentClient) =>
      this.service
      .getSpecialitiesCurrentClient(action.payload)
      .pipe(
        map(res => new ActionGetSpecialitiesCurrentClientSuccess({ data:res })),
        catchError(error => {
          this.handleError(error);
          return of(new ActionGetSpecialitiesCurrentClientError({ error }))
        })
      )
    )
  );

  @Effect()
  getDepartmentsByUnitId = this.actions$.pipe(
    ofType < ActionGetDepartmentsByUnitId > (SpecialitiesActionTypes.GET_DEPARTMENTS_BY_UNIT_ID),
    switchMap((action: ActionGetDepartmentsByUnitId) =>
      this.service
      .getDepartmentsByUnitId(action.payload)
      .pipe(
        map(res => new ActionGetDepartmentsByUnitIdSuccess({ data: res })),
        catchError(error => {
          this.handleError(error);
          return of(new ActionGetDepartmentsByUnitIdError({ error }))
        })
      )
    )
  );

  @Effect()
  addSpecializationsToUnit = this.actions$.pipe(
    ofType < ActionAddSpecializationsToUnit > (SpecialitiesActionTypes.ADD_SPECIALIZATIONS_TO_UNITS),
    switchMap((action: ActionAddSpecializationsToUnit) =>
      this.service
      .addDepartmentsToUnit(action.payload.value)
      .pipe(
        map(res => new ActionAddSpecializationsToUnitSuccess({ data: res })),
        catchError(error => {
          this.handleError(error);
          return of(new ActionAddSpecializationsToUnitError({ error }))
        })
      )
    )
  );

  @Effect()
  getUnitSpecialityDetails = this.actions$.pipe(
    ofType < ActionGetUnitSpecialityDetails > (SpecialitiesActionTypes.GET_UNIT_SPECIALITY_DETAILS),
    switchMap((action: ActionGetUnitSpecialityDetails) =>
      this.service
      .getUnitSpecialityDetails(action.payload)
      .pipe(
        map(res => new ActionGetUnitSpecialityDetailsSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new ActionGetUnitSpecialityDetailsError({ error }))
        })
      )
    )
  );

  @Effect()
  updateUnitSpecialityDetails = this.actions$.pipe(
    ofType < ActionUpdateUnitSpecialityDetails > (SpecialitiesActionTypes.UPDATE_UNIT_SPECIALITY_DETAILS),
    switchMap((action: ActionUpdateUnitSpecialityDetails) =>
      this.service
      .updateUnitSpecialityDetails(action.payload)
      .pipe(
        map(res => new ActionUpdateUnitSpecialityDetailsSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new ActionUpdateUnitSpecialityDetailsError({ error }))
        })
      )
    )
  );

  @Effect()
  approveUnitSpecialityDetails = this.actions$.pipe(
    ofType < ActionApproveUnitSpeciality > (SpecialitiesActionTypes.APPROVE_UNIT_SPECIALITIES),
    switchMap((action: ActionApproveUnitSpeciality) =>
      this.service
      .updateUnitSpecialityDetails(action.payload)
      .pipe(
        map(res => new ActionApproveUnitSpecialitySuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new ActionApproveUnitSpecialityError({ error }))
        })
      )
    )
  );

}
