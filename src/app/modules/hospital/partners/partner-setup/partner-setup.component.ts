import { Component, Inject, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';

import { takeUntil, tap, distinctUntilChanged, debounceTime, switchMap, take } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { State, selectHomeState } from '@app/state/home/home.state';
import { ActionGetPartnerDetails, ActionGetPartnerDetailsSuccess, PartnersActionTypes, ActionCreatePartnerSuccess, ActionGetPartnerFinanceDataSuccess, ActionUpdatePartnerAddressSuccess, ActionGetPartnerContactsSuccess, ActionProceedFromPartnerContacts, ActionUpdatePartnerFinanceSuccess } from '@app/state/partners/partners.actions';
import { selectPartners } from '@app/state/partners/partners.selectors';
import { MessageModalComponent } from '@app/common/message-modal/message-modal.component';
import { NewPartnerComponent } from '../new-partner/new-partner.component';

export interface DialogData {
    name: string;
    data: any;
    tenantId: string;
  }

  @Component({
    selector: 'app-partner-setup',
    templateUrl: './partner-setup.component.html',
    styleUrls: ['./partner-setup.component.scss']
  })

  export class PartnerSetupComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();
  partnerData: any;
  sub: any;
  parentRouteId: any;
  isContractDone = false;
  isFinanceDone = false;
  isAdminAccountDone = false;
    tabs:any =[];
  setupState = "partnerDetailsState";
  unitId: any;
  partnerId: any;
  tenantId: any;
  partnerRole: any;
  constructor(
    public store: Store<State>,
    private _formBuilder: FormBuilder,
    private updates$: Actions,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {
    this.sub = this.route.params.subscribe(params => {
      this.unitId= params["unitId"];
      this.partnerId = params["partnerId"];
    });

    this.sub = this.route.parent.params.subscribe(params => {
      this.tenantId= params["id"];
    });
  }

  ngOnInit() {
    this.store
    .pipe(select(selectPartners), takeUntil(this.unsubscribe$))
    .subscribe((stocks: any) => {
      this.partnerData = stocks.partnerData;
      this.partnerRole = stocks.partnerData ?  stocks.partnerData.partnerRole : '';
    });

    // this.store.dispatch(
    //   new ActionGetPartnerDetails({ id: this.partnerId, tenantId: this.tenantId })
    // );
    this.init();
    this.initEffects();
  };

  init(){
   
    //  if (this.setupState === 'financeState') {
    //   this.gotoFinance();
    // }
    // else if (this.setupState === 'partnerDetailsState') {
    //   this.gotoDetails();
    // }
  }



  initEffects(){
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetPartnerDetailsSuccess>(PartnersActionTypes.GET_PARTNER_SUCCESS),
      tap(action =>
        this.handleGetPartnerSuccess(action)
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
      ofType<ActionUpdatePartnerAddressSuccess>(PartnersActionTypes.UPDATE_PARTNER_ADDRESS_SUCCESS),
      tap(action =>
        this.handleUpdatePartnerAddressSuccess(action)
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
      ofType<ActionProceedFromPartnerContacts>(PartnersActionTypes.PROCEED_FROM_PARTNER_CONTACTS),
      tap(action =>
        this.handleGetContactSuccess(action)
      )
    ).subscribe();
  }

  handleGetContactSuccess(action){
    if(this.unitId){
      if(action.payload.isSetup){
        this.showPartnerContactPersonsUpdateModal();
      }
    } else {
      this.gotoFinance();
    }
      
  }

  handleGetPartnerSuccess(action){
    console.log(action);
    this.partnerData = action.payload[0].data;
  }


  handleUpdatePartnerSuccess(action){
    console.log(action);
    // this.gotoFinance();
    this.partnerRole = action.payload.tenants.partnerRole;
    if(this.unitId){
      this.showPartnerDetailsUpdateModal();
    } else {
     this.gotoAddress();
    // this.gotoFinance();
   //  this.gotoMedia();
    }
    
  }

  handleUpdatePartnerAddressSuccess(action){
    if(this.unitId){
      this.showPartnerAddressDetailsUpdateModal();
    } else {
      if(this.partnerRole === 'ASSOCIATE'){
        this.gotoPartnerContacts();
      } else {
        this.gotoFinance();
      }
      
    }
  }

  handleGetPartnerFinanceSuccess(action){
  if(this.unitId){
    this.showFinanceSuccessModal();
  } else {
    this.goToSummary();
  }
  
  }


  handleGetPartnerContactSuccess(action){
    this.gotoFinance();
  }

// AUTo FLOW MODALS.....
  showPartnerDetailsUpdateModal(){
    console.log(this.partnerData);
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '800px',
      data: {
        tenantId: this.tenantId,
          name: "partner-details-success-modal",
          data: this.partnerData,
          unitId: this.unitId
      }
    });
    

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        if(this.partnerData.approvalId){
          this.goToSummary();
        } else {
          this.gotoAddress();
        }
         
      }
      else {
     
       }
    });
  }

  showPartnerContactPersonsUpdateModal(){
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '800px',
      data: {
        tenantId: this.tenantId,
          name: "partner-contact-person-details-success-modal",
          data: this.partnerData,
          unitId: this.unitId
      }
    });
    

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        //this.router.navigate(['home/business/unit-view/'+this.tenantId+ '/unit-partners/'+this.unitId+'/partner-setup/'+ this.partnerId]);
       this.gotoFinance();
      }
      else {
     
       }
    });
  }



  showFinanceSuccessModal(){
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '800px',
      data: {
        tenantId: this.tenantId,
          name: "partner-finance-success-modal",
          data: this.partnerData
      }
    });
    

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        const url = `home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}`;
        this.router.navigate([url]);
       // 'home/business/unit-setup/'+this.tenantId+ '/unit-partners/'+this.unitId+'/partner-address'
        console.log(result);
        this.createNewPartner();
      }
      else {
        this.router.navigate(['home/business/hospital-info/'+this.tenantId]);
       }
    });
  }

  showPartnerAddressDetailsUpdateModal(){
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '800px',
      data: {
        tenantId: this.tenantId,
          name: "partner-address-success-modal",
          data: this.partnerData,
          unitId: this.unitId
      }
    });
    

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        console.log(result);
        if(this.partnerRole === 'ASSOCIATE'){
          this.gotoPartnerContacts();
        } else {
          this.gotoFinance();
        }
        //this.router.navigate(['home/business/unit-view/'+this.tenantId+ '/unit-partners/'+this.unitId+'/partner-setup/'+ this.partnerId]);
       
      }
    });
  }
  createNewPartner(){
    const dialogRef = this.dialog.open(NewPartnerComponent, {
        width: '400px',
        data: {
          tenantId: this.tenantId
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result && result.status) {
          if(this.unitId){
            const url = 'home/business/client-view/'+this.tenantId+ '/unit-partners/'+this.unitId +'/partner-setup/' + result.partnerId + '/partner-details';
            this.router.navigate([url]);
          } else{
            this.router.navigate(['home/business/partner-setup/' + result.partnerId + '/partner-details']);
          }
         
        }
        else { }
      });
    }

// ROUTES

goToSummary(){
  const url = this.unitId? `home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}/partner-view/${this.partnerId}/partner-summary`
  : `home/business/partner-setup/${this.partnerId}/partner-summary`;
  this.router.navigate([url]);
}

gotoDetails(){
  const url = this.unitId? `home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}/partner-setup/${this.partnerId}/partner-details`
  : `home/business/partner-setup/${this.partnerId}/partner-details`;
  this.router.navigate([url]);
}

gotoFinance(){
  const url = this.unitId? `home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}/partner-setup/${this.partnerId}/partner-finance`
  : `home/business/partner-setup/${this.partnerId}/partner-finance`;
  this.router.navigate([url]);

}

gotoAddress(){
  const url = this.unitId? `home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}/partner-setup/${this.partnerId}/partner-address`
  : `home/business/partner-setup/${this.partnerId}/partner-address`;
  this.router.navigate([url]);
}


gotoPartnerContacts(){
  const url = this.unitId? `home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}/partner-setup/${this.partnerId}/partner-contact-person`
  : `home/business/partner-setup/${this.partnerId}/partner-contact-person`;
  this.router.navigate([url]);
}

gotoMedia(){
    const url = this.unitId? `home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}/partner-setup/${this.partnerId}/partner-media`
    : `home/business/partner-setup/${this.partnerId}/partner-media`;
    this.router.navigate([url]);
  }


ngOnDestroy(): void {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}



  }
