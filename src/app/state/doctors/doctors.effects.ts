import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { DoctorsService } from './doctors.service';
import { DoctorsActionTypes } from './doctors.actions';
import * as DoctorActions from './doctors.actions';
import { AppService } from '@app/app/app.service';


@Injectable()
export class DoctorsEffects {

  constructor(
    private actions$: Actions < Action > ,
    private service: DoctorsService,
    private appService: AppService
  ) {}

  handleError(error) {
    this.appService.logError(error, true);
  }

  @Effect()
  getAllDoctors = this.actions$.pipe(
    ofType < DoctorActions.ActionGetDoctors > (DoctorsActionTypes.GET_DOCTORS),
    switchMap((action: DoctorActions.ActionGetDoctors) =>
      this.service
      .getDoctors()
      .pipe(
        map(res => new DoctorActions.ActionGetDoctorsSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new DoctorActions.ActionGetDoctorsError({ error }))
        }),
      )
    )
  );

  @Effect()
  getDoctorsByUnitId = this.actions$.pipe(
    ofType < DoctorActions.ActionGetDoctorsByUnitId > (DoctorsActionTypes.GET_DOCTORS_BY_UNIT_ID),
    switchMap((action: DoctorActions.ActionGetDoctorsByUnitId) =>
      this.service
      .getDoctorsByUnitId(action.payload)
      .pipe(
        map(res => new DoctorActions.ActionGetDoctorsByUnitIdSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new DoctorActions.ActionGetDoctorsByUnitIdError({ error }))
        })
      )
    )
  );

  @Effect()
  approveDoctors = this.actions$.pipe(
    ofType < DoctorActions.ActionApproveUnitDoctor > (DoctorsActionTypes.APPROVE_UNIT_DOCTORS),
    switchMap((action: DoctorActions.ActionApproveUnitDoctor) =>
      this.service
      .approveDoctor(action.payload.value)
      .pipe(
        map(tenants => new DoctorActions.ActionApproveUnitDoctorSuccess(tenants)),
        catchError(error => {
          this.handleError(error);
          return of(new DoctorActions.ActionApproveUnitDoctorError({ error }))
        })
      )
    )
  );

  @Effect()
  updateDoctors = this.actions$.pipe(
    ofType < DoctorActions.ActionUpdateDoctors > (DoctorsActionTypes.UPDATE_DOCTORS),
    switchMap((action: DoctorActions.ActionUpdateDoctors) =>
      this.service
      .updateDoctor(action.payload.value)
      .pipe(
        map(tenants => new DoctorActions.ActionUpdateDoctorsSuccess(tenants)),
        catchError(error => {
          this.handleError(error);
          return of(new DoctorActions.ActionUpdateDoctorsError({ error }))
        })
      )
    )
  );

  @Effect()
  addDoctors = this.actions$.pipe(
    ofType < DoctorActions.ActionAddDoctors > (DoctorsActionTypes.ADD_DOCTORS),
    switchMap((action: DoctorActions.ActionAddDoctors) =>
      this.service
      .addDoctor(action.payload.value)
      .pipe(
        map(tenants => new DoctorActions.ActionAddDoctorsSuccess(tenants)),
        catchError(error => {
          this.handleError(error);
          return of(new DoctorActions.ActionAddDoctorsError({ error }))
        })
      )
    )
  );

  @Effect()
  addDoctorsToUnit = this.actions$.pipe(
    ofType < DoctorActions.ActionAddDoctorsToUnitId > (DoctorsActionTypes.ADD_DOCTORS_TO_UNIT_ID),
    switchMap((action: DoctorActions.ActionAddDoctorsToUnitId) =>
      this.service
      .addDoctorsToUnit(action.payload.value)
      .pipe(
        map(res => new DoctorActions.ActionAddDoctorsToUnitIdSuccess({ data: res })),
        catchError(error => {
          this.handleError(error);
          return of(new DoctorActions.ActionAddDoctorsToUnitIdError({ error }))
        })
      )
    )
  );

  @Effect()
  removeDoctorsFromUnit = this.actions$.pipe(
    ofType < DoctorActions.ActionRemoveDoctorFromUnit > (DoctorsActionTypes.REMOVE_DOCTORS_FROM_UNIT),
    switchMap((action: DoctorActions.ActionRemoveDoctorFromUnit) =>
      this.service
      .removeDoctorFromUnit(action.payload)
      .pipe(
        map(res => new DoctorActions.ActionRemoveDoctorFromUnitSuccess({ data: res })),
        catchError(error => {
          this.handleError(error);
          return of(new DoctorActions.ActionRemoveDoctorFromUnitError({ error }))
        })
      )
    )
  );

  @Effect()
  deleteDoctor = this.actions$.pipe(
    ofType < DoctorActions.ActionDeleteDoctors > (DoctorsActionTypes.DELETE_DOCTORS),
    switchMap((action: DoctorActions.ActionDeleteDoctors) =>
      this.service
      .deleteDoctor(action.payload)
      .pipe(
        map(res => new DoctorActions.ActionDeleteDoctorsSuccess({ data: res })),
        catchError(error => {
          this.handleError(error);
          return of(new DoctorActions.ActionDeleteDoctorsError({ error }))
        })
      )
    )
  );

  @Effect()
  getDoctorByDocId = this.actions$.pipe(
    ofType < DoctorActions.ActionGetDoctorByDocId > (DoctorsActionTypes.GET_DOCTOR_BY_DOC_ID),
    switchMap((action: DoctorActions.ActionGetDoctorByDocId) =>
      this.service
      .getDoctorByDocId(action.payload)
      .pipe(
        map(res => new DoctorActions.ActionGetDoctorByDocIdSuccess({ data: res })),
        catchError(error => {
          this.handleError(error);
          return of(new DoctorActions.ActionGetDoctorByDocIdError({ error }))
        })
      )
    )
  );

  

}
