import { Component, Inject, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';

import { takeUntil, tap, distinctUntilChanged, debounceTime, switchMap, take } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'


import { State, selectHomeState } from '@app/state/home/home.state';
import { selectPartners } from '@app/state/partners/partners.selectors';
import { ActionGetPartnerDetails, PartnersActionTypes, ActionGetPartnerDetailsSuccess, ActionCreatePartnerSuccess, ActionUpdatePartnerContactsSuccess, ActionGetPartnerFinanceDataSuccess, ActionUpdatePartnerAddressSuccess, ActionProceedFromPartnerContacts, ActionUpdatePartnerFinanceSuccess } from '@app/state/partners/partners.actions';
import { selectAuthState } from '@app/core';
import { MessageModalComponent } from '@app/common/message-modal/message-modal.component';
import { NewPartnerComponent } from '../new-partner/new-partner.component';
import { AppService } from '@app/app/app.service';
import { Constants } from '@app/core/constants/constants';

@Component({
    selector: 'app-partner-view',
    templateUrl: './partner-view-manager.component.html',
    styleUrls: ['./partner-view-manager.component.scss']
  })

  export class PartnerViewManagerComponent implements OnInit {
    private unsubscribe$: Subject<void> = new Subject<void>();
  partnerData: any;
  sub: any;
  parentRouteId: any;
  isContractDone = false;
  isFinanceDone = false;
  isAdminAccountDone = false;
    tabs:any =[];
  setupState = "partnerDetailsState";
  partnerType: any;
  unitId: any;
  partnerId: any;
  tenantId: any;

  partnerRole: any;
  partnerConstants: any;
  alertMsgs: any;

    constructor(
        public store: Store<State>,
        private _formBuilder: FormBuilder,
        private updates$: Actions,
        private router: Router,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private appService: AppService
      ) {
        this.sub = this.route.params.subscribe(params => {
          this.unitId= params["unitId"];
          this.partnerId = params["partnerId"];
        });
    
        this.sub = this.route.parent.params.subscribe(params => {
          this.tenantId= params["id"];
        });

        this.partnerConstants = Constants.partners;
        this.alertMsgs = this.partnerConstants.alerts;
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
              this.partnerData = stocks.partnerData;
              this.partnerRole = stocks.partnerData ?  stocks.partnerData.partnerRole : '';
            });
        
            this.store.dispatch(
              new ActionGetPartnerDetails({ id: this.partnerId, tenantId: this.tenantId })
            );
            this.initEffects();
          };

          
            gotoDetails(){
              const routeViewPath =  this.unitId ? 
                    `home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}/partner-view/${this.partnerId}/partner-details`:
                    'home/business/partner-view/' + this.partnerId + '/partner-details';
                    this.router.navigate([routeViewPath]);
            }

            gotoFinance(){
              const routeViewPath =  this.unitId ? 
              `home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}/partner-view/${this.partnerId}/partner-finance`:
              'home/business/partner-view/' + this.partnerId + '/partner-finance';
              this.router.navigate([routeViewPath]);
               // this.router.navigate(['home/client/partner-view/' + this.parentRouteId + '/partner-finance']);
            }

            gotoAddress(){
              const routeViewPath =  this.unitId ? 
              `home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}/partner-view/${this.partnerId}/partner-address`:
              'home/business/partner-view/' + this.partnerId + '/partner-address';
              this.router.navigate([routeViewPath]);
            }

            gotoPartnerContacts(){
              const url = this.unitId? `home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}/partner-setup/${this.partnerId}/partner-contact-person`
              : `home/business/partner-view/${this.partnerId}/partner-contact-person`;
              this.router.navigate([url]);
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

  handleGetPartnerSuccess(action){
    this.partnerData = action.payload[0].data;
    // this.gotoFinance();
  }

  handleUpdatePartnerSuccess(action){
    this.partnerRole = action.payload.tenants.partnerRole;
    if(this.unitId){
      this.showPartnerDetailsUpdateModal(action.payload.tenants.approvalId);
    } else {
     this.gotoAddress();
    // this.gotoFinance();
   //  this.gotoMedia();
    }
  }

  handleUpdatePartnerAddressSuccess(action){
    if(this.unitId){
      this.showPartnerAddressDetailsUpdateModal(action.payload.data.approvalId);
    } else {
      if(this.partnerRole === 'ASSOCIATE'){
        this.gotoPartnerContacts();
      } else {
        this.gotoFinance();
      }
      
    }
  }

  handleGetContactSuccess(action){
    if(this.unitId){
      if(!action.payload.isSetup){
        this.showPartnerContactPersonsUpdateModal(action.payload.data.approvalId);
      }
      
    } else {
      this.gotoFinance();
    }
  }

  handleGetPartnerFinanceSuccess(action){
    if(this.unitId){
      this.showFinanceSuccessModal();
    } else {
      this.goToSummary();
    }
    }


  handleGetPartnerAddressSuccess(action){
    if(this.partnerRole === 'ASSOCIATE'){
      this.gotoPartnerContacts();
    } else {
      this.gotoFinance();
    }
  }

  goToSummary(){
    const routeViewPath =  this.unitId ?  `home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}/partner-view/${this.partnerId}/partner-summary`:
    'home/business/partner-view/' + this.partnerId + '/partner-summary';
    this.router.navigate([routeViewPath]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  showPartnerDetailsUpdateModal(approvalId){

    // this.appService.showMsg(this.alertMsgs.APPROVAL_MSG, this.alertMsgs.PARTNER_DETAILS_APPROVAL, false);
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '800px',
      data: {
        tenantId: this.tenantId,
          name: "partner-details-success-modal",
          data: this.partnerData,
          unitId: this.unitId,
          approvalId: approvalId
      }
    });
    

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        if(result.approvalId){
          this.goToSummary();
        } else {
          this.gotoAddress();
        }
        
      }
      else {
     
       }
    });
  }


  showPartnerAddressDetailsUpdateModal(approvalId){
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '800px',
      data: {
        tenantId: this.tenantId,
          name: "partner-address-success-modal",
          data: this.partnerData,
          unitId: this.unitId,
          approvalId: approvalId
      }
    });
    

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        if(result.approvalId){
          this.goToSummary();
        } else {
          if(this.partnerRole === 'ASSOCIATE'){
            this.gotoPartnerContacts();
          } else {
            this.gotoFinance();
          }
        }
       
        //this.router.navigate(['home/business/unit-view/'+this.tenantId+ '/unit-partners/'+this.unitId+'/partner-setup/'+ this.partnerId]);
       
      }
    });
  }

  showPartnerContactPersonsUpdateModal(approvalId){
    const dialogRef = this.dialog.open(MessageModalComponent, {
      width: '800px',
      data: {
        tenantId: this.tenantId,
          name: "partner-contact-person-details-success-modal",
          data: this.partnerData,
          unitId: this.unitId,
          approvalId: approvalId
      }
    });
    

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        if(result.approvalId){
          this.goToSummary();
        } else {
        //this.router.navigate(['home/business/unit-view/'+this.tenantId+ '/unit-partners/'+this.unitId+'/partner-setup/'+ this.partnerId]);
       this.gotoFinance();
      }
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
        console.log(result);
        this.createNewPartner();
      }
      else {
        this.router.navigate(['home/business/hospital-info/'+this.tenantId]);
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


  }
