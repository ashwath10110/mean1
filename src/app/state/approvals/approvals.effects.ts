import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { map, switchMap, catchError, tap, exhaustMap } from 'rxjs/operators';

import * as ApprovalsActions from './approvals.actions';
import { apiPoints } from 'api-config';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppService } from '@app/app/app.service';
import { ApprovalsService } from '@app/state/approvals/approvals.service';
import { ApprovalsActionTypes, ActionRejectApprovals, ActionRejectApprovalsSuccess, ActionRejectApprovalsError } from '@app/state/approvals/approvals.actions';
const BASE_URL = apiPoints.BASE_URL_MEDBUD;
const BASE_CLIENT_URL = apiPoints.BASE_CLIENT_URL;

@Injectable()
export class ApprovalsEffects {

  constructor(
    private actions$: Actions<Action>,
    private service: ApprovalsService,
    private appService: AppService,
    private httpClient: HttpClient
  ) { }


  handleError(payload) {
    const showSnackBar = true;
    this.appService.logError(payload, showSnackBar);
  }

  @Effect()
  getApprovals$ = this.actions$.pipe(
    ofType(ApprovalsActionTypes.GET_APPROVALS),
    map((action: ApprovalsActions.ActionGetApprovals) => action.payload),
    exhaustMap((action: any) =>
      this.service
        .getApprovals()
        .pipe(
          map(data => new ApprovalsActions.ActionGetApprovalsSuccess(data)),
          catchError(error => {
            this.handleError(error);
            return of(new ApprovalsActions.ActionGetApprovalsError({ error }))
          })
        )
    )
  );

  @Effect()
  bulkApproval$ = this.actions$.pipe(
    ofType(ApprovalsActionTypes.BULK_APPROVE),
    map((action: ApprovalsActions.ActionBulkApprove) => action.payload),
    exhaustMap((action: any) =>
      this.service
        .bulkApprove(action)
        .pipe(
          map(data => new ApprovalsActions.ActionBulkApproveSuccess(data)),
          catchError(error => {
            this.handleError(error);
            return of(new ApprovalsActions.ActionBulkApproveError({ error }))
          })
        )
    )
  );

  @Effect()
  bulkReject$ = this.actions$.pipe(
    ofType(ApprovalsActionTypes.BULK_REJECT),
    map((action: ApprovalsActions.ActionBulkApprove) => action.payload),
    exhaustMap((action: any) =>
      this.service
        .bulkReject(action)
        .pipe(
          map(data => new ApprovalsActions.ActionBulkRejectSuccess(data)),
          catchError(error => {
            this.handleError(error);
            return of(new ApprovalsActions.ActionBulkRejectError({ error }))
          })
        )
    )
  );

  @Effect()
  rejectApprovals$ = this.actions$.pipe(
    ofType(ApprovalsActionTypes.REJECT_APPROVAL),
    map((action: ActionRejectApprovals) => action.payload),
    exhaustMap((action: any) =>
      this.service
        .rejectApprovals(action)
        .pipe(
          map(data => new ActionRejectApprovalsSuccess(data)),
          catchError(error => {
            this.handleError(error);
            return of(new ActionRejectApprovalsError({ error }))
          })
        )
    )
  );
}
