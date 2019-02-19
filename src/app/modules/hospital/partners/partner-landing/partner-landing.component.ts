import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Actions, ofType } from '@ngrx/effects';

import { takeUntil, take, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { State, selectHomeState } from '@app/state/home/home.state';
import { FormBuilder } from '@angular/forms';
import { ActionGetPartnerDetailsSuccess, PartnersActionTypes, ActionGetPartnerDetails, ActionGetPartnerFinanceData, ActionCreatePartnerSuccess, ActionGetPartnerFinanceDataSuccess, ActionGetPartnerAddress, ActionUpdatePartnerAddressSuccess, ActionUpdatePartnerFinanceSuccess, ActionGetPartnerContacts, ActionGetPartnerContactsSuccess, ActionGetPartnerAddressSuccess, ActionProceedFromPartnerContacts } from '@app/state/partners/partners.actions';
import { selectPartners } from '@app/state/partners/partners.selectors';
import { isObjectEmpty } from '@app/utils/obj-utils';
import { selectAuthState } from '@app/core';
@Component({
  selector: 'app-partner-landing',
  templateUrl: './partner-landing.component.html',
  styleUrls: ['./partner-landing.component.scss']
})

export class PartnerLandingComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();

  sub: any;
  parentRouteId: any;
  breadCrumbs = [];
  currentUnit: any;
  init = false;
  stocks: any;

  isFinanceDone = false;
  isContactDone = false;
  isDetailsDone = false;
  isAddressDone = false;
  partnerType = '';

  partnerId: any;
  tenantId: any;
  unitId: any;
  routeName:any;

  partnerRole: string = '';
  constructor(
    public store: Store<State>,
    private updates$: Actions,
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.route.parent.url.subscribe(url => {
      this.routeName = url[0].path;
    });

    this.sub = this.route.parent.params.subscribe(params => {
      this.unitId= params["unitId"];
      this.partnerId = params["partnerId"];
    });

    this.sub = this.route.parent.parent.params.subscribe(params => {
      this.tenantId= params["id"];
    });

    if(this.unitId){
      this.breadCrumbs = [{
        'label': 'Org Chart',
        'url': '#/home/business/hospital-info/'+ this.tenantId
      },{
        'label': 'Partners',
        'url': `#/home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}`
      }, {
        'label': 'Partner Details'
      }];
    } else {
      this.breadCrumbs = [{
        'label': 'Partners',
        'url': `#/home/business/partners`
      }, {
        'label': 'Partner Details'
      }];
    }

    this.store.pipe(select(selectAuthState), takeUntil(this.unsubscribe$))
    .subscribe((tenantState: any) => {
        console.log(tenantState);
        if(!this.tenantId){
          this.tenantId = tenantState.user.data.tenantId;
        }
    });

    this.route.parent.params
    .pipe(take(1))
    .subscribe((params) => {
      const id = params['partnerId'];
      this.partnerId = id;
      this.store.dispatch(
        new ActionGetPartnerDetails({
          id: id,
          tenantId:this.tenantId
        })
      );
    });

    this.store.dispatch(
      new ActionGetPartnerFinanceData({
        id: this.partnerId,
        tenantId: this.tenantId
      })
    );

    this.store.dispatch(
      new ActionGetPartnerAddress({
        id: this.partnerId,
        tenantId: this.tenantId
      })
    );

    // this.store.dispatch(
    //   new ActionGetPartnerContacts({
    //     id: this.partnerId,
    //     tenantId: this.tenantId
    //   })
    // );
  }

  partnerDetailSuccessHandler(action){
   const financeData = this.stocks.partnerFinanceData;
  const  contactsData = this.stocks.partnerContactData;
  const  partnerData = this.stocks.partnerData;
  const addressData = this.stocks.partnerAddressData;
  this.isFinanceDone = isObjectEmpty(financeData) ? false : true;
   // this.isContactDone = isObjectEmpty(contactsData) ? false : true;
  this.isDetailsDone = isObjectEmpty(partnerData) ? false: true;
  this.isAddressDone = isObjectEmpty(addressData) ? false : true;
  this.isContactDone = contactsData.length>0;
  this.partnerRole = partnerData.partnerRole;
  }

  ngOnInit() {

    this.store.pipe(select(selectAuthState), takeUntil(this.unsubscribe$))
    .subscribe((tenantState: any) => {
        console.log(tenantState);
        if(!this.tenantId){
          this.tenantId = tenantState.user.data.tenantId;
        }
    });

    this.store
      .pipe(select(selectPartners), takeUntil(this.unsubscribe$))
      .subscribe((stocks: any) => {
        this.stocks = stocks;
        console.log(stocks);
      });


      this.initEffects();
      
  }


  initEffects(){

    this.updates$.pipe(
      ofType<ActionGetPartnerDetailsSuccess>(PartnersActionTypes.GET_PARTNER_SUCCESS),
      tap(action => {
        const  partnerData = this.stocks.partnerData;
        this.partnerRole = partnerData.partnerRole;
        this.isDetailsDone = isObjectEmpty(partnerData) ? false: true;
      }
        
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionCreatePartnerSuccess>(PartnersActionTypes.CREATE_PARTNER_SUCCESS),
      tap(action =>
        this.handleUpdatePartnerSuccess(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetPartnerFinanceDataSuccess>(PartnersActionTypes.GET_PARTNER_FINANCE_DATA_SUCCESS),
      tap(action =>
       {
        const financeData = this.stocks.partnerFinanceData;
        this.isFinanceDone = isObjectEmpty(financeData) ? false : true;
       }
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetPartnerAddressSuccess>(PartnersActionTypes.GET_PARTNER_ADDRESS_SUCCESS),
      tap(action =>{
        const addressData = this.stocks.partnerAddressData;
        this.isAddressDone = isObjectEmpty(addressData) ? false : true;
      }
       // this.handleUpdatePartnerAddressSuccess(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionUpdatePartnerFinanceSuccess>(PartnersActionTypes.UPDATE_PARTNER_FINANCE_SUCCESS),
      tap(action =>
        this.handleGetPartnerFinanceSuccess(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionUpdatePartnerAddressSuccess>(PartnersActionTypes.UPDATE_PARTNER_ADDRESS_SUCCESS),
      tap(action =>
        this.handleUpdatePartnerAddressSuccess(action)
      )
    ).subscribe();

    this.updates$.pipe(
      ofType<ActionGetPartnerContactsSuccess>(PartnersActionTypes.GET_PARTNER_CONTACT_SUCCESS),
      tap(action =>
        {
          const  contactsData = this.stocks.partnerContactData;
          this.isContactDone = contactsData.length>0;
         // this.handleGetContactSuccess(action);

        }
      )
    ).subscribe();

    this.updates$.pipe(
      ofType<ActionProceedFromPartnerContacts>(PartnersActionTypes.PROCEED_FROM_PARTNER_CONTACTS),
      tap(action =>
        {
          this.handleGetContactSuccess(action);
        }
      )
    ).subscribe();
  }

  handleUpdatePartnerSuccess(action){
    this.gotoAddress();
  }

  handleGetPartnerFinanceSuccess(action){
    this.goToSummary();
  }

  handleUpdatePartnerAddressSuccess(action){
    if(this.partnerRole === 'ASSOCIATE'){
     this.gotoContacts();
    } else {
      this.gotoFinance();
    }
   
  }

  handleGetContactSuccess(action){
    console.log(action);
      this.gotoFinance();
  }

  goToSummary(){
    const routeViewPath =  this.unitId ?  `home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}/partner-view/${this.partnerId}/partner-summary`:
    'home/business/partner-view/' + this.parentRouteId + '/partner-summary';
    this.router.navigate([routeViewPath]);
  }
  gotoAdminAccount() {
    const routeViewPath =  this.unitId ? 
    `home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}/partner-view/${this.partnerId}/partner-details`:
    'home/business/partner-view/' + this.partnerId + '/partner-details';
    this.router.navigate([routeViewPath]);
  }

  gotoFinance() {
    const routeViewPath = this.unitId ? 
    `home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}/partner-view/${this.partnerId}/partner-finance`:
    'home/business/partner-view/' + this.partnerId + '/partner-finance';
    this.router.navigate([routeViewPath]);
  }

  gotoAddress(){
    const routeViewPath = this.unitId ? 
    `home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}/partner-view/${this.partnerId}/partner-address`:
    'home/business/partner-view/' + this.partnerId + '/partner-address';
    this.router.navigate([routeViewPath]);
  }

  gotoContacts(){
    const routeViewPath = this.unitId ? 
    `home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}/partner-view/${this.partnerId}/partner-contact-person`:
    'home/business/partner-view/' + this.partnerId + '/partner-contact-person';
    this.router.navigate([routeViewPath]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}