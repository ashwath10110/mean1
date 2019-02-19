import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import * as PartnersActions from './partners.actions';
import { PartnersService } from './partners.service';
import { PartnersActionTypes } from './partners.actions';
import { AppService } from '@app/app/app.service';


@Injectable()
export class PartnerEffects {

  constructor(
    private actions$: Actions<Action>,
    private service: PartnersService,
    private appService: AppService
  ) { }

  handleError(error){
    this.appService.logError(error, true);
  }
  

  @Effect()
  getPartners = this.actions$.pipe(
    ofType<PartnersActions.ActionGetPartners>(PartnersActionTypes.GET_PARTNERS),
    switchMap((action: PartnersActions.ActionGetPartners) =>
      this.service
        .getPartners(action.payload)
        .pipe(
          map(res => new PartnersActions.ActionGetPartnersSuccess({ data: res })),
          catchError(error => { 
            this.handleError(error);
            return of(new PartnersActions.ActionGetPartnersError({ error }))}),
        )
        
    )
  );

  // @Effect()
  // getTenants = this.actions$.pipe(
  //   ofType<PartnersActions.ActionGetTenants>(PartnersActionTypes.GET_TENANTS),
  //   switchMap((action: PartnersActions.ActionGetTenants) =>
  //     this.service
  //       .getTenants(action.payload.symbol)
  //       .pipe(
  //         map(tenants => new PartnersActions.ActionGetTenantsSuccess({ tenants: tenants.data })),
  //         catchError(error => of(new PartnersActions.ActionGetTenantsError({ error })))
  //       )
  //   )
  // );

  
  @Effect()
  createPartner = this.actions$.pipe(
    ofType<PartnersActions.ActionCreatePartner>(PartnersActionTypes.CREATE_PARTNER),
    switchMap((action: PartnersActions.ActionCreatePartner) =>
      this.service
        .createPartner(action.payload)
        .pipe(
          map(tenants => new PartnersActions.ActionCreatePartnerSuccess({ tenants: tenants.data })),
          catchError(error => {
            this.handleError(error);
            return of(new PartnersActions.ActionCreatePartnerError({ error }))})
        )
    )
  );

 
  // @Effect()
  // createTenant = this.actions$.pipe(
  //   ofType<PartnersActions.ActionCreateTenants>(PartnersActionTypes.CREATE_TENANTS),
  //   switchMap((action: PartnersActions.ActionCreateTenants) =>
  //     this.service
  //       .createClient(action.payload.payload)
  //       .pipe(
  //         map(tenants => new PartnersActions.ActionCreateTenantsSuccess(tenants)),
  //         catchError(error => of(new PartnersActions.ActionCreateTenantsError({ error })))
  //       )
  //   )
  // );

  @Effect()
  approvePartnerDetails = this.actions$.pipe(
    ofType < PartnersActions.ActionApprovePartnerDetails > (PartnersActionTypes.APPROVE_PARTNER_DETAILS),
    switchMap((action: PartnersActions.ActionApprovePartnerDetails) =>
      this.service
      .createPartner(action.payload)
      .pipe(
        map(res => new PartnersActions.ActionApprovePartnerDetailsSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new PartnersActions.ActionApprovePartnerDetailsError({ error }))
        })
      )
    )
  );

  @Effect()
  deletePartner = this.actions$.pipe(
    ofType<PartnersActions.ActionDeletePartner>(PartnersActionTypes.DELETE_PARTNER),
    switchMap((action: PartnersActions.ActionDeletePartner) =>
      this.service
        .deletePartner(action.payload)
        .pipe(
          map(partners => new PartnersActions.ActionDeletePartnerSuccess(partners)
          ),
          catchError(error => {
             return of(new PartnersActions.ActionDeletePartnerError({ error }))})
        )
    )
  );

  @Effect()
  getPartner  = this.actions$.pipe(
    ofType<PartnersActions.ActionGetPartnerDetails>(PartnersActionTypes.GET_PARTNER_DETAILS),
    switchMap((action: PartnersActions.ActionGetPartnerDetails) =>
      this.service
        .getPartner(action.payload)
        .pipe(
          map(partners => new PartnersActions.ActionGetPartnerDetailsSuccess(partners)
          ),
          catchError(error => {
            this.handleError(error);
           return  of(new PartnersActions.ActionGetPartnerDetailsError({ error }))})
        )
    )
  );

  @Effect()
  updatePartnerFinanceData = this.actions$.pipe(
    ofType<PartnersActions.ActionUpdatePartnerFinance>(PartnersActionTypes.UPDATE_PARTNER_FINANCE),
    switchMap((action: PartnersActions.ActionUpdatePartnerFinance) =>
      this.service
        .updatePartnerFinanceData(action.payload)
        .pipe(
          map(tenants => new PartnersActions.ActionUpdatePartnerFinanceSuccess(tenants)),
          catchError(error => { 
            this.handleError(error);
            return of(new PartnersActions.ActionUpdatePartnerFinanceError({ error }))})
        )
    )
  );

  
  @Effect()
  getPartnerFinanceData  = this.actions$.pipe(
    ofType<PartnersActions.ActionGetPartnerFinanceData>(PartnersActionTypes.GET_PARTNER_FINANCE_DATA),
    switchMap((action: PartnersActions.ActionGetPartnerFinanceData) =>
      this.service
        .getPartnerFinance(action.payload)
        .pipe(
          map(partners => new PartnersActions.ActionGetPartnerFinanceDataSuccess(partners)
          ),
          catchError(error => {
            this.handleError(error);
            return of(new PartnersActions.ActionGetPartnerFinanceDataError({ error }))
          })
        )
    )
  );
  @Effect()
  updatePartnerContactData = this.actions$.pipe(
    ofType<PartnersActions.ActionUpdatePartnerContacts>(PartnersActionTypes.UPDATE_PARTNER_CONTACT),
    switchMap((action: PartnersActions.ActionUpdatePartnerContacts) =>
      this.service
        .updatePartnerContactDetails(action.payload)
        .pipe(
          map(tenants => new PartnersActions.ActionUpdatePartnerContactsSuccess(tenants)),
          catchError(error => {
            this.handleError(error);
            return of(new PartnersActions.ActionUpdatePartnerContactsError({ error }))
          })
        )
    )
  );

  @Effect()
  getPartnerContactData  = this.actions$.pipe(
    ofType<PartnersActions.ActionGetPartnerContacts>(PartnersActionTypes.GET_PARTNER_CONTACT),
    switchMap((action: PartnersActions.ActionGetPartnerContacts) =>
      this.service
        .getPartnerContactDetails(action.payload)
        .pipe(
          map(partners => new PartnersActions.ActionGetPartnerContactsSuccess(partners)
          ),
          catchError(error =>{
            this.handleError(error);
            return of(new PartnersActions.ActionGetPartnerContactsError({ error }))
          })
        )
    )
  );

  @Effect()
  getPartnerAddressData  = this.actions$.pipe(
    ofType<PartnersActions.ActionGetPartnerAddress>(PartnersActionTypes.GET_PARTNER_ADDRESS),
    switchMap((action: PartnersActions.ActionGetPartnerAddress) =>
      this.service
        .getPartnerAddress(action.payload)
        .pipe(
          map(partners => new PartnersActions.ActionGetPartnerAddressSuccess(partners)
          ),
          catchError(error =>{
            this.handleError(error);
            return of(new PartnersActions.ActionGetPartnerAddressError({ error }))
          })
        )
    )
  );

  @Effect()
  updatePartnerAddressData  = this.actions$.pipe(
    ofType<PartnersActions.ActionUpdatePartnerAddress>(PartnersActionTypes.UPDATE_PARTNER_ADDRESS),
    switchMap((action: PartnersActions.ActionUpdatePartnerAddress) =>
      this.service
        .updatePartnerAddress(action.payload)
        .pipe(
          map(partners => new PartnersActions.ActionUpdatePartnerAddressSuccess(partners)
          ),
          catchError(error =>{
            this.handleError(error);
            return of(new PartnersActions.ActionUpdatePartnerAddressError({ error }))
          })
        )
    )
  );

  @Effect()
  getPartnerContactDetails = this.actions$.pipe(
    ofType < PartnersActions.ActionGetPartnerContacts > (PartnersActionTypes.GET_PARTNER_CONTACT),
    switchMap((action: PartnersActions.ActionGetPartnerContacts) =>
      this.service
      .getPartnerContactDetails(action.payload)
      .pipe(
        map(res => new PartnersActions.ActionGetPartnerContactsSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new PartnersActions.ActionGetPartnerContactsError({ error }))
        })
      )
    )
  );

  // @Effect()
  // updateUnitContactDetails = this.actions$.pipe(
  //   ofType < ActionUpdateUnitContactDetails > (DetailsActionTypes.UPDATE_UNIT_CONTACT_DETAILS),
  //   switchMap((action: ActionUpdateUnitContactDetails) =>
  //     this.service
  //     .updateUnitContactDetails(action.payload)
  //     .pipe(
  //       map(res => new ActionUpdateUnitContactDetailsSuccess({ data: res.data })),
  //       catchError(error => of (new ActionUpdateUnitContactDetailsError({ error })))
  //     )
  //   )
  // );

  @Effect()
  deletePartnerContactDetails = this.actions$.pipe(
    ofType < PartnersActions.ActionDeletePartnerContacts > (PartnersActionTypes.DELETE_PARTNER_CONTACT),
    switchMap((action: PartnersActions.ActionDeletePartnerContacts) =>
      this.service
      .deletePartnerContactDetails(action.payload)
      .pipe(
        map(res => new PartnersActions.ActionDeletePartnerContactsSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new PartnersActions.ActionDeletePartnerContactsError({ error }))
        })
      )
    )
  );


  @Effect()
  approvePartnerFinance = this.actions$.pipe(
    ofType < PartnersActions.ActionApprovePartnerFinance > (PartnersActionTypes.APPROVE_PARTNER_FINANCE),
    switchMap((action: PartnersActions.ActionApprovePartnerFinance) =>
      this.service
      .updatePartnerFinanceData(action.payload)
      .pipe(
        map(res => new PartnersActions.ActionApprovePartnerFinanceSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new PartnersActions.ActionApprovePartnerFinanceError({ error }))
        })
      )
    )
  );

  @Effect()
  approvePartnerAddress = this.actions$.pipe(
    ofType < PartnersActions.ActionApprovePartnerAddress > (PartnersActionTypes.APPROVE_PARTNER_ADDRESS),
    switchMap((action: PartnersActions.ActionApprovePartnerAddress) =>
      this.service
      .updatePartnerAddress(action.payload)
      .pipe(
        map(res => new PartnersActions.ActionApprovePartnerAddressSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new PartnersActions.ActionApprovePartnerAddressError({ error }))
        })
      )
    )
  );


  @Effect()
  approvePartnerContactPerson = this.actions$.pipe(
    ofType < PartnersActions.ActionApprovePartnerContact > (PartnersActionTypes.APPROVE_PARTNER_CONTACT),
    switchMap((action: PartnersActions.ActionApprovePartnerContact) =>
      this.service
      .updatePartnerContactDetails(action.payload)
      .pipe(
        map(res => new PartnersActions.ActionApprovePartnerContactSuccess({ data: res.data })),
        catchError(error => {
          this.handleError(error);
          return of(new PartnersActions.ActionApprovePartnerContactError({ error }))
        })
      )
    )
  );


}
