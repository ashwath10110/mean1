import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as UnitsActions from './units.actions';

import { UnitsActionTypes } from './units.actions';
import { UnitsService } from './units.service';
import { AppService } from '@app/app/app.service';


@Injectable()
export class UnitsEffects {

  constructor(
    private actions$: Actions < Action > ,
    private service: UnitsService,
    private appService: AppService
  ) {}

  handleError(error) {
    this.appService.logError(error, true);
  }


  @Effect()
  createTenantUnit = this.actions$.pipe(
    ofType < UnitsActions.ActionCreateTenantUnit > (UnitsActionTypes.CREATE_TENANT_UNIT),
    switchMap((action: UnitsActions.ActionCreateTenantUnit) =>
      this.service
      .createTenantUnit(action.payload.value)
      .pipe(
        map(tenants => new UnitsActions.ActionCreateTenantUnitSuccess(tenants)),
        catchError(error => {
          this.handleError(error);
          return of(new UnitsActions.ActionCreateTenantUnitError({ error }))
        })
      )
    )
  );

  @Effect()
  getTenantUnits = this.actions$.pipe(
    ofType < UnitsActions.ActionGetTenantUnits > (UnitsActionTypes.GET_TENANT_UNITS),
    switchMap((action: UnitsActions.ActionGetTenantUnits) =>
      this.service
      .getTenantUnits(action.payload)
      .pipe(
        map(res => new UnitsActions.ActionGetTenantUnitsSuccess(res)),
        catchError(error => {
          this.handleError(error);
          return of(new UnitsActions.ActionGetTenantUnitsError({ error }))
        })
      )
    )
  );

  @Effect()
  deleteTenantUnit = this.actions$.pipe(
    ofType < UnitsActions.ActionDeleteTenantUnit > (UnitsActionTypes.DELETE_TENANT_UNIT),
    switchMap((action: UnitsActions.ActionDeleteTenantUnit) =>
      this.service
      .deleteTenantUnit(action.payload)
      .pipe(
        map(res => new UnitsActions.ActionDeleteTenantUnitSuccess({ data: res })),
        catchError(error => {
          this.handleError(error);
          return of(new UnitsActions.ActionDeleteTenantUnitError({ error }))
        })
      )
    )
  );

}
