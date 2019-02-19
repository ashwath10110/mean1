import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { ClientOnboardingActionTypes, ActionCreateTenant, ActionCreateTenantSuccess, ActionCreateTenantError, ActionGetClientFinanceData, ActionGetClientFinanceDataSuccess, ActionGetClientFinanceDataError, ActionUpdateClientFinanceData, ActionUpdateClientFinanceDataSuccess, ActionUpdateClientFinanceDataError, ActionGetClientContractData, ActionGetClientContractDataSuccess, ActionGetClientContractDataError, ActionGetClientAdminAccountsData, ActionGetClientAdminAccountsDataSuccess, ActionGetClientAdminAccountsDataError, ActionUpdateClientDataError, ActionUpdateClientDataSuccess, ActionUpdateClientData, ActionUpdateClientContractDataSuccess, ActionUpdateClientContractDataError, ActionUpdateClientContractData, ActionUpdateClientContactDetails, ActionUpdateClientContactDetailsSuccess, ActionUpdateClientContactDetailsError, ActionGetClientContactDetailsError, ActionGetClientContactDetailsSuccess, ActionGetClientContactDetails, ActionDeleteClientContactDetails, ActionDeleteClientContactDetailsError, ActionDeleteClientContactDetailsSuccess, ActionCreateAdminUser, ActionCreateAdminUserSuccess, ActionCreateAdminUserError, ActionGetAdminUser, ActionGetAdminUserSuccess, ActionGetAdminUserError, ActionGetClientDetails, ActionGetClientDetailsSuccess, ActionGetClientDetailsError, ActionUpdateClientAdminAccountsData, ActionUpdateClientAdminAccountsDataError, ActionUpdateClientAdminAccountsDataSuccess } from './client-onboarding.actions';
import { ClientOnboardingService } from './client-onboarding.service';
import { AppService } from '@app/app/app.service';


@Injectable()
export class ClientOnboardingEffects {

  constructor(
    private actions$: Actions<Action>,
    private service: ClientOnboardingService,
    private appService: AppService
  ) { }

  handleError(error) {
    if (error.status === 409) {
      let err = error.error;
      err.error_description = "Client with this name exists. Please choose a new client name";
      error = {
        ...error,
        error: err
      };
    }
    this.appService.logError(error, true);
  }

  @Effect()
  createClient = this.actions$.pipe(
    ofType<ActionCreateTenant>(ClientOnboardingActionTypes.UPDATE_CLIENT_INFO_DATA),
    switchMap((action: ActionCreateTenant) =>
      this.service
        .updateInfo(action.payload.value)
        .pipe(
          map(data => new ActionCreateTenantSuccess(data)),
          catchError(error => {
            this.handleError(error);
            return of(new ActionCreateTenantError({ error }))
          })
        )
    )
  );

  @Effect()
  getFinance = this.actions$.pipe(
    ofType<ActionGetClientFinanceData>(ClientOnboardingActionTypes.GET_CLIENT_FINANCE_DATA),
    switchMap((action: ActionGetClientFinanceData) =>
      this.service
        .getFinanceDetailsTenant(action.payload.value)
        .pipe(
          map(data => new ActionGetClientFinanceDataSuccess(data)),
          catchError(error => {
            this.handleError(error);
            return of(new ActionGetClientFinanceDataError({ error }))
          })
        )
    )
  );

  @Effect()
  updateFinance = this.actions$.pipe(
    ofType<ActionUpdateClientFinanceData>(ClientOnboardingActionTypes.UPDATE_CLIENT_FINANCE_DATA),
    switchMap((action: ActionUpdateClientFinanceData) =>
      this.service
        .updateFinance(action.payload.value)
        .pipe(
          map(data => new ActionUpdateClientFinanceDataSuccess(data)),
          catchError(error => {
            this.handleError(error);
            return of(new ActionUpdateClientFinanceDataError({ error }))
          })
        )
    )
  );

  @Effect()
  getContract = this.actions$.pipe(
    ofType<ActionGetClientContractData>(ClientOnboardingActionTypes.GET_CLIENT_CONTRACT_DATA),
    switchMap((action: ActionGetClientContractData) =>
      this.service
        .getContractDetailsTenant(action.payload)
        .pipe(
          map(data => new ActionGetClientContractDataSuccess(data)),
          catchError(error => {
            this.handleError(error);
            return of(new ActionGetClientContractDataError({ error }))
          })
        )
    )
  );

  @Effect()
  updateContract = this.actions$.pipe(
    ofType<ActionUpdateClientContractData>(ClientOnboardingActionTypes.UPDATE_CLIENT_CONTRACT_DATA),
    switchMap((action: ActionUpdateClientContractData) =>
      this.service
        .updateContract(action.payload.value)
        .pipe(
          map(data => new ActionUpdateClientContractDataSuccess(data)),
          catchError(error => {
            this.handleError(error);
            return of(new ActionUpdateClientContractDataError({ error }))
          })
        )
    )
  );

  @Effect()
  getAdminAccountData = this.actions$.pipe(
    ofType<ActionGetClientAdminAccountsData>(ClientOnboardingActionTypes.GET_CLIENT_ADMIN_ACCOUNTS_DATA),
    switchMap((action: ActionGetClientAdminAccountsData) =>
      this.service
        .getAdminAccountDetailsTenant(action.payload)
        .pipe(
          map(data => new ActionGetClientAdminAccountsDataSuccess(data)),
          catchError(error => {
            this.handleError(error);
            return of(new ActionGetClientAdminAccountsDataError({ error }))
          })
        )
    )
  );
  @Effect()
  updateClientData = this.actions$.pipe(
    ofType<ActionUpdateClientData>(ClientOnboardingActionTypes.UPDATE_CLIENT_DATA),
    switchMap((action: ActionUpdateClientData) =>
      this.service
        .updateClientDetails(action.payload.value)
        .pipe(
          map(data => new ActionUpdateClientDataSuccess(data)),
          catchError(error => {
            this.handleError(error);
            return of(new ActionUpdateClientDataError({ error }))
          })
        )
    )
  );

  @Effect()
  updateAdminAccountData = this.actions$.pipe(
    ofType<ActionUpdateClientAdminAccountsData>(ClientOnboardingActionTypes.UPDATE_CLIENT_ADMIN_ACCOUNTS_DATA),
    switchMap((action: ActionUpdateClientAdminAccountsData) =>
      this.service
        .updateClientAccountAdminDetails(action.payload.value)
        .pipe(
          map(data => new ActionUpdateClientAdminAccountsDataSuccess(data)),
          catchError(error => {
            this.handleError(error);
            return of(new ActionUpdateClientAdminAccountsDataError({ error }))
          })
        )
    )
  );

  @Effect()
  getClientContacts = this.actions$.pipe(
    ofType<ActionGetClientContactDetails>(ClientOnboardingActionTypes.GET_CLIENT_CONTACT_DETAILS),
    switchMap((action: ActionGetClientContactDetails) =>
      this.service
        .getClientContacts(action.payload)
        .pipe(
          map(data => new ActionGetClientContactDetailsSuccess(data)),
          catchError(error => {
            this.handleError(error);
            return of(new ActionGetClientContactDetailsError({ error }))
          })
        )
    )
  );

  @Effect()
  updateClientContacts = this.actions$.pipe(
    ofType<ActionUpdateClientContactDetails>(ClientOnboardingActionTypes.UPDATE_CLIENT_CONTACT_DETAILS),
    switchMap((action: ActionUpdateClientContactDetails) =>
      this.service
        .updateClientContactsData(action.payload)
        .pipe(
          map(data => new ActionUpdateClientContactDetailsSuccess(data)),
          catchError(error => {
            this.handleError(error);
            return of(new ActionUpdateClientContactDetailsError({ error }))
          })
        )
    )
  );

  @Effect()
  deleteClientContactDetails = this.actions$.pipe(
    ofType<ActionDeleteClientContactDetails>(ClientOnboardingActionTypes.DELETE_CLIENT_CONTACT_DETAILS),
    switchMap((action: ActionDeleteClientContactDetails) =>
      this.service
        .deleteClientContactDetails(action.payload)
        .pipe(
          map(res => new ActionDeleteClientContactDetailsSuccess({ data: res.data })),
          catchError(error => {
            this.handleError(error);
            return of(new ActionDeleteClientContactDetailsError({ error }))
          })
        )
    )
  );

  @Effect()
  createClientAdminUser = this.actions$.pipe(
    ofType<ActionCreateAdminUser>(ClientOnboardingActionTypes.CREATE_ADMIN_USER),
    switchMap((action: ActionCreateAdminUser) =>
      this.service
        .updateClientAdminUser(action.payload.value)
        .pipe(
          map(data => new ActionCreateAdminUserSuccess(data)),
          catchError(error => {
            this.handleError(error);
            return of(new ActionCreateAdminUserError({ error }))
          })
        )
    )
  );


  @Effect()
  getClientAdminUser = this.actions$.pipe(
    ofType<ActionGetAdminUser>(ClientOnboardingActionTypes.GET_ADMIN_USER),
    switchMap((action: ActionGetAdminUser) =>
      this.service
        .getClientAdminUser(action.payload)
        .pipe(
          map(data => new ActionGetAdminUserSuccess(data)),
          catchError(error => {
            this.handleError(error);
            return of(new ActionGetAdminUserError({ error }))
          })
        )
    )
  );

  @Effect()
  getClientDetails = this.actions$.pipe(
    ofType<ActionGetClientDetails>(ClientOnboardingActionTypes.GET_CLIENT_DETAILS),
    switchMap((action: ActionGetClientDetails) =>
      this.service
        .getClientDetails(action.payload)
        .pipe(
          map(data => new ActionGetClientDetailsSuccess(data)),
          catchError(error => {
            this.handleError(error);
            return of(new ActionGetClientDetailsError({ error }))
          })
        )
    )
  );


}
