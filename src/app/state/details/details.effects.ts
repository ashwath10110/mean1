import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { DetailsService } from './details.service';
import { ActionGetUnitDetails, DetailsActionTypes, ActionGetUnitDetailsSuccess, ActionGetUnitDetailsError, ActionUpdateUnitDetails, ActionUpdateUnitDetailsSuccess, ActionUpdateUnitDetailsError, ActionGetUnitAddressDetails, ActionGetUnitAddressDetailsSuccess, ActionGetUnitAddressDetailsError, ActionUpdateUnitAddressDetails, ActionUpdateUnitAddressDetailsSuccess, ActionUpdateUnitAddressDetailsError,  ActionGetUnitFinanceSuccess, ActionGetUnitFinanceError, ActionGetUnitFinance, ActionUpdateUnitFinance, ActionUpdateUnitFinanceSuccess, ActionUpdateUnitFinanceError, ActionDeleteUnitContactDetails, ActionDeleteUnitContactDetailsSuccess, ActionDeleteUnitContactDetailsError, ActionApproveUnitDetails, ActionApproveUnitDetailsSuccess, ActionApproveUnitDetailsError, ActionApproveUnitFinance, ActionApproveUnitFinanceSuccess, ActionApproveUnitFinanceError, ActionApproveUnitAddress, ActionApproveUnitAddressSuccess, ActionApproveUnitAddressError } from './details.actions';
import { AppService } from '@app/app/app.service';

@Injectable()
export class DetailsEffects {

  constructor(
    private actions$: Actions < Action > ,
    private service: DetailsService,
    private appService: AppService
  ) {}

  handleError(error) {
    this.appService.logError(error, true);
  }
  // @Effect()
  // getUnitDetails = this.actions$.pipe(
  //   ofType<ActionGetUnitDetails>(DetailsActionTypes.GET_UNIT_DETAILS),
  //   switchMap((action: ActionGetUnitDetails) =>
  //     this.service
  //       .getUnitDetails(action.payload)
  //       .pipe(
  //         map(res => new ActionGetUnitDetailsSuccess({ data: res.data })),
  //         catchError(error => of(new ActionGetUnitDetailsError({ error })))
  //       )
  //   )
  // );

  // @Effect()
  // updateUnitDetails = this.actions$.pipe(
  //   ofType<ActionUpdateUnitDetails>(DetailsActionTypes.UPDATE_UNIT_DETAILS),
  //   switchMap((action: ActionUpdateUnitDetails) =>
  //     this.service
  //       .updateUnitDetails(action.payload)
  //       .pipe(
  //         map(res => new ActionUpdateUnitDetailsSuccess({ data: res.data })),
  //         catchError(error => of(new ActionUpdateUnitDetailsError({ error })))
  //       )
  //   )
  // );

  @Effect()
  getUnitAddressDetails = this.actions$.pipe(
    ofType < ActionGetUnitAddressDetails > (DetailsActionTypes.GET_UNIT_ADDRESS_DETAILS),
    switchMap((action: ActionGetUnitAddressDetails) =>
      this.service
      .getUnitAddressDetails(action.payload)
      .pipe(
        map(res => new ActionGetUnitAddressDetailsSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new ActionGetUnitAddressDetailsError({ error }))
        })
      )
    )
  );

  @Effect()
  updateUniAddressDetails = this.actions$.pipe(
    ofType < ActionUpdateUnitAddressDetails > (DetailsActionTypes.UPDATE_UNIT_ADDRESS_DETAILS),
    switchMap((action: ActionUpdateUnitAddressDetails) =>
      this.service
      .updateUnitAddressDetails(action.payload)
      .pipe(
        map(res => new ActionUpdateUnitAddressDetailsSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new ActionUpdateUnitAddressDetailsError({ error }))
        })
      )
    )
  );

  @Effect()
  getUnitDetails = this.actions$.pipe(
    ofType < ActionGetUnitDetails > (DetailsActionTypes.GET_UNIT_DETAILS),
    switchMap((action: ActionGetUnitDetails) =>
      this.service
      .getUnitDetails(action.payload)
      .pipe(
        map(res => new ActionGetUnitDetailsSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new ActionGetUnitDetailsError({ error }))
        })
      )
    )
  );

  @Effect()
  updateUnitDetails = this.actions$.pipe(
    ofType < ActionUpdateUnitDetails > (DetailsActionTypes.UPDATE_UNIT_DETAILS),
    switchMap((action: ActionUpdateUnitDetails) =>
      this.service
      .updateUnitDetails(action.payload)
      .pipe(
        map(res => new ActionUpdateUnitDetailsSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new ActionUpdateUnitDetailsError({ error }))
        })
      )
    )
  );

  @Effect()
  approveUnitDetails = this.actions$.pipe(
    ofType < ActionApproveUnitDetails > (DetailsActionTypes.APPROVE_UNIT_DETAILS),
    switchMap((action: ActionApproveUnitDetails) =>
      this.service
      .updateUnitDetails(action.payload)
      .pipe(
        map(res => new ActionApproveUnitDetailsSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new ActionApproveUnitDetailsError({ error }))
        })
      )
    )
  );

  @Effect()
  approveUnitFinance = this.actions$.pipe(
    ofType < ActionApproveUnitFinance > (DetailsActionTypes.APPROVE_UNIT_FINANCE),
    switchMap((action: ActionApproveUnitFinance) =>
      this.service
      .updateUnitFinance(action.payload)
      .pipe(
        map(res => new ActionApproveUnitFinanceSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new ActionApproveUnitFinanceError({ error }))
        })
      )
    )
  );

  @Effect()
  approveUnitAddress = this.actions$.pipe(
    ofType < ActionApproveUnitAddress > (DetailsActionTypes.APPROVE_UNIT_ADDRESS),
    switchMap((action: ActionApproveUnitAddress) =>
      this.service
      .updateUnitAddress(action.payload)
      .pipe(
        map(res => new ActionApproveUnitAddressSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new ActionApproveUnitAddressError({ error }))
        })
      )
    )
  );

  @Effect()
  getUnitFinance = this.actions$.pipe(
    ofType < ActionGetUnitFinance > (DetailsActionTypes.GET_UNIT_FINANCE),
    switchMap((action: ActionGetUnitFinance) =>
      this.service
      .getUnitFinance(action.payload)
      .pipe(
        map(res => new ActionGetUnitFinanceSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new ActionGetUnitFinanceError({ error }))
        })
      )
    )
  );

  @Effect()
  updateUnitFinance = this.actions$.pipe(
    ofType < ActionUpdateUnitFinance > (DetailsActionTypes.UPDATE_UNIT_FINANCE),
    switchMap((action: ActionUpdateUnitFinance) =>
      this.service
      .updateUnitFinance(action.payload)
      .pipe(
        map(res => new ActionUpdateUnitFinanceSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new ActionUpdateUnitFinanceError({ error }))
        })
      )
    )
  );

  @Effect()
  deleteUnitContactDetails = this.actions$.pipe(
    ofType < ActionDeleteUnitContactDetails > (DetailsActionTypes.DELETE_UNIT_CONTACT_DETAILS),
    switchMap((action: ActionDeleteUnitContactDetails) =>
      this.service
      .deleteUnitContactDetails(action.payload)
      .pipe(
        map(res => new ActionDeleteUnitContactDetailsSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new ActionDeleteUnitContactDetailsError({ error }))
        })
      )
    )
  );

}
