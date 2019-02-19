import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { map, switchMap, catchError, tap, exhaustMap } from 'rxjs/operators';
import { ClientsService } from './clients.service';
import { ClientsActionTypes } from './clients.actions';

import * as ClientsActions from './clients.actions';
import { apiPoints } from 'api-config';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppService } from '@app/app/app.service';
const BASE_URL = apiPoints.BASE_URL_MEDBUD;
const BASE_CLIENT_URL = apiPoints.BASE_CLIENT_URL;

@Injectable()
export class ClientsEffects {

  constructor(
    private actions$: Actions<Action>,
    private service: ClientsService,
    private appService: AppService,
    private httpClient: HttpClient
  ) { }

  @Effect()
  getTenants$ = this.actions$.pipe(
    ofType(ClientsActionTypes.GET_TENANTS),
    map((action: ClientsActions.ActionGetTenants) => action.payload),
    exhaustMap((action: any) =>
      this.service
        .getTenants()
        .pipe(
          map(data => new ClientsActions.ActionGetTenantsSuccess(data)),
          catchError(error => { 
            this.handleError(error);
            return of(new ClientsActions.ActionGetTenantsError({ error }))
          })
        )
    )
  );

  handleError(payload) {
    const showSnackBar = true;
    this.appService.logError(payload, showSnackBar);
  }

  @Effect()
  deleteTenant = this.actions$.pipe(
    ofType<ClientsActions.ActionDeleteTenant>(ClientsActionTypes.DELETE_TENANT),
    switchMap((action: ClientsActions.ActionDeleteTenant) =>
      this.service
        .deleteTenant(action.payload)
        .pipe(
          map(tenants => new ClientsActions.ActionDeleteTenantSuccess({ tenants })),
          catchError(error => of(new ClientsActions.ActionDeleteTenantError({ error })))
        )
    )
  );

  @Effect()
  approveStep2$ = this.actions$.pipe(
    ofType(ClientsActionTypes.APPROVE_STEP2),
    map((action: ClientsActions.ActionApproveStep2) => action.payload),
    exhaustMap((action: any) =>
      this.service
        .setp2Approval(action.approvalObj)
        .pipe(
          map(data => new ClientsActions.ActionApproveStep2Success(data)),
          catchError(error => {
            this.handleError(error);
            return of(new ClientsActions.ActionApproveStep2Error({ error }))
          })
        )
    )
  );

  @Effect()
  getTenantDetails = this.actions$.pipe(
    ofType<ClientsActions.ActionGetTenantDetails>(ClientsActionTypes.GET_TENANT_DETAILS),
    switchMap((action: ClientsActions.ActionGetTenantDetails) =>
      this.service
        .getTenantDetails(action.payload)
        .pipe(
          map(tenants => new ClientsActions.ActionGetTenantDetailsSuccess(tenants)),
          catchError(error => of(new ClientsActions.ActionGetTenantDetailsError({ error })))
        )
    )
  );
  
}
