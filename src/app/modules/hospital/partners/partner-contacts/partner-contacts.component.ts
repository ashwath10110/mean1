import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { State, selectHomeState } from '@app/state/home/home.state';
import { Store, select } from '@ngrx/store';

import { Actions, ofType } from '@ngrx/effects';
// import { isObjectEmpty } from '@app/common/business-utils';
// import { ActionGetPartnerContacts, ActionGetPartnerContactsSuccess, HomeActionTypes, ActionUpdatePartnerContacts } from '@app/state/home/home.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionGetPartnerContacts, ActionGetPartnerContactsSuccess, PartnersActionTypes, ActionUpdatePartnerContacts, ActionDeletePartnerContacts, ActionGetPartnerAddress, ActionGetPartnerAddressSuccess, ActionDeletePartnerContactsSuccess, ActionProceedFromPartnerContacts, ActionApprovePartnerContactSuccess, ActionApprovePartnerContact, ActionUpdatePartnerContactsSuccess } from '@app/state/partners/partners.actions';
import { isObjectEmpty } from '@app/utils/obj-utils';
import { ActionUpdateClientContactDetails } from '@app/state/client-onboarding/client-onboarding.actions';
import { selectAuthState } from '@app/core';
import { selectPartners } from '@app/state/partners/partners.selectors';
import { isApprover } from '@app/utils/partner-utils';
import { selectClients } from '@app/state/clients/clients.selectors';
import { Constants } from '@app/core/constants/constants';
import { AppService } from '@app/app/app.service';
@Component({
  selector: 'app-partner-contacts',
  templateUrl: './partner-contacts.component.html',
  styleUrls: ['./partner-contacts.component.scss']
})

export class PartnerContactComponent implements OnInit {

  partnerInfoFormGroup: FormGroup;
  @Output() updates: EventEmitter<any> = new EventEmitter<any>();
  private unsubscribe$: Subject<void> = new Subject<void>();

  sub: any;
  parentRouteId: any;
  breadCrumbs = [];
  partnerContactData = {};
  currentContact = {};
  statusForUpdate = "";
  stocks: any;
  contactDetails: any = [];

  tenantId: string;
  partnerId: string;
  unitId: string;

  partnerEmailId: string;
  routeName: string;
  showApproveButton = false;
  state: any;
  isSetup: any;

  partnerConstants: any;
  alertMsgs: any;
  
  constructor(
    public store: Store<State>,
    private _formBuilder: FormBuilder,
    private updates$: Actions,
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService
  ) {
   this.route.parent.url.subscribe(url => {
      console.log(url);
      this.isSetup = url[0].path === 'unit-setup';
    })
    this.sub = this.route.parent.params.subscribe(params => {
           
      this.partnerId = params["partnerId"];
      this.unitId = params["unitId"];
    });
    this.sub = this.route.parent.parent.params.subscribe(params => {
      this.tenantId = params["id"];
    });

    if(this.unitId){
      this.breadCrumbs = [{
        'label': 'Org Chart',
        'url': '#/home/business/hospital-info/'+ this.tenantId
      },{
        'label': 'Partners',
        'url': `#/home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}`
      }, {
        'label': 'Partner Details',
        'url': `#/home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}/partner-view/${this.partnerId}/partner-summary`
      }, {
        'label': 'Partner Contacts'
      }];
    } else {
      this.breadCrumbs = [{
        'label': 'Partners',
        'url': '#/home/business/partners'
      }, {
        'label': 'Partner Details',
        'url': '#/home/business/partner-view/' + this.partnerId + '/partner-summary'
      }, {
        'label': 'Partner Contacts'
      }];
    }


    this.partnerConstants = Constants.partners;
    this.alertMsgs = this.partnerConstants.alerts;
  }

    ngOnInit()  {

      let isApproverRole = false;
      if(this.unitId){
        isApproverRole = isApprover(this.route);
      }

      this.store.pipe(select(selectAuthState), takeUntil(this.unsubscribe$))
      .subscribe((tenantState: any) => {
          if(!this.tenantId){
            this.tenantId = tenantState.user.data.tenantId;
          }
      });

      
        this.store
        .pipe(select(selectPartners), takeUntil(this.unsubscribe$))
        .subscribe((stocks: any) => {
          this.stocks = stocks;
          this.partnerEmailId = this.stocks.partnerAddressData && this.stocks.partnerAddressData.email || '';
          this.contactDetails = this.stocks.partnerContactData;
        });


        this.store
        .pipe(select(selectClients), takeUntil(this.unsubscribe$))
        .subscribe((state: any) => {
          this.state = state;
        });

        if (isApproverRole) {
          this.updates$.pipe(
            // TODO CHECK THE ACTIONS
            ofType<ActionApprovePartnerContactSuccess>(PartnersActionTypes.APPROVE_PARTNER_CONTACT_SUCCESS),
            tap(action =>
              this.handleApprovePartnerContactPersonSuccess(action)
            )
          ).subscribe();
    
          let obj = this.state.currentApproval.data;
          obj = JSON.parse(obj);
          console.log(this.state);
          this.showApproveButton = true;
          this.breadCrumbs = [];
          let testArray = [];
          testArray.push(obj);
          this.contactDetails = testArray;
    
        }else{
          this.store.dispatch(
            new ActionGetPartnerContacts({
              partnerId: this.partnerId,
              tenantId: this.tenantId
            })
          );
          this.initEffects();
        }
    }

    handleApprovePartnerContactPersonSuccess(action){
      this.router.navigate(['/home/business/approvals/list']);
    }

    initEffects(){
        this.updates$.pipe(
            ofType<ActionGetPartnerContactsSuccess>(PartnersActionTypes.GET_PARTNER_CONTACT_SUCCESS),
            tap(action =>
              this.handleGetContactSuccess(action)
            )
          ).subscribe();

      
          this.updates$.pipe(
            ofType<ActionDeletePartnerContactsSuccess>(PartnersActionTypes.DELETE_PARTNER_CONTACT_SUCCESS),
            tap(action =>
              this.store.dispatch(
                new ActionGetPartnerContacts({
                  partnerId: this.partnerId,
                  tenantId: this.tenantId
                })
              )
            )
          ).subscribe();

          this.updates$.pipe(
            ofType<ActionUpdatePartnerContactsSuccess>(PartnersActionTypes.UPDATE_PARTNER_CONTACT_SUCCESS),
            tap(action =>
              this.handleUpdateContactSuccess(action)
            )
          ).subscribe();
    }

// Contact Success....
    handleGetContactSuccess(action){
        const partnerContact = action.payload.data;
        this.contactDetails = partnerContact;
    }

    handleUpdateContactSuccess(action){
     action.payload.approvalId &&  this.appService.showMsg(this.alertMsgs.APPROVAL_MSG, this.alertMsgs.PARTNER_CONTACT_PERSON_APPROVAL, false);
      this.store.dispatch(
        new ActionGetPartnerContacts({
          partnerId: this.partnerId,
          tenantId: this.tenantId
        })
      )
    }

 
  //Proceesd From Partner Contacts on Updation and move to next flow
    proceedFromContacts(){
      this.store.dispatch(
        new ActionProceedFromPartnerContacts({
          isSetupView: this.isSetup
        })
      );
  }

  // Update / Create Contact Person
    handleContactsChange(event) {
      if (event.name === 'update-contact-details') {
        this.currentContact = {
          ...event.value,
          tenantId: this.tenantId,
          partnerId: this.partnerId,
        //  username: username,
        //  reportsTo: this.partnerEmailId,
          unitId: this.unitId
          
        }
        let statusForUpdate = event.value.hasOwnProperty('id') ? 'put' : 'post';

        if(this.showApproveButton){
          let obj = this.state.currentApproval.data;
          obj = JSON.parse(obj);
         
          let approvalId  = this.state.currentApproval.id;
          const  value = {
            ...obj,
            unitId: this.unitId,
            tenantId: this.tenantId,
            statusForUpdate: this.state.currentApproval.method,
            approvalId
          }
          this.store.dispatch(
            new ActionApprovePartnerContact({
             value: value,
             tenantId: this.tenantId
            })
          );

        } else{

          this.store.dispatch(
            new ActionUpdatePartnerContacts({
              tenantId: this.tenantId,
              statusForUpdate: statusForUpdate,
              value: this.currentContact,
            })
    
          );
        }
  
       
      }
    }

    // Delete contact person
    handleRemoveContact(event) {
      if (event.name === 'remove-contact-detail') {
        this.store.dispatch(
          new ActionDeletePartnerContacts({
            tenantId: this.tenantId,
            id: event.value.id
          })
        )
      
    }
  }

  // DESTROY
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}