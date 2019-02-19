import { Component, OnInit, ViewChild } from '@angular/core';
import { selectClientOnboarding } from '@app/state/client-onboarding/client-onboarding.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { State, selectHomeState } from '@app/state/home/home.state';
import { Store, select } from '@ngrx/store';
import { FinanceComponent } from '@app/common/finance/finance.component';
import { Actions, ofType } from '@ngrx/effects';
import { ActionGetPartnerFinanceData, ActionGetPartnerFinanceDataSuccess, PartnersActionTypes, ActionUpdatePartnerFinance, ActionApprovePartnerFinanceSuccess, ActionApprovePartnerFinance } from '@app/state/partners/partners.actions';
import { isObjectEmpty } from '@app/utils/obj-utils';
import { selectAuthState } from '@app/core';
import { selectPartners } from '@app/state/partners/partners.selectors';
import { isApprover, createApprovalComments } from '@app/utils/partner-utils';
import { selectClients } from '@app/state/clients/clients.selectors';
import { selectApprovals } from '@app/state/approvals/approvals.selectors';
import { ActionRejectApprovals, ActionRejectApprovalsSuccess, ApprovalsActionTypes } from '@app/state/approvals/approvals.actions';
import { Breadcrumb } from 'primeng/primeng';
// import { isObjectEmpty } from '@app/common/business-utils';
// import { ActionGetPartnerFinanceData, HomeActionTypes, ActionUpdatePartnerFinance, ActionGetPartnerFinanceDataSuccess } from '@app/state/home/home.actions';
// import { ActionGetClientFinanceDataSuccess } from '@app/state/client-onboarding/client-onboarding.actions';

@Component({
    selector: 'app-partner-finance',
    templateUrl: './partner-finance.component.html',
    styleUrls: ['./partner-finance.component.scss']
})

export class PartnerFinanceComponent implements OnInit {

    @ViewChild("partnerFinance") partnerFinance: FinanceComponent;

    partnerData: any;
    sub: any;
    parentRouteId: any;
    agree = false;
    attachments = [];
    breadCrumbs = [];
    partnerFinanceData: any;
    statusForUpdate = "";
    isFinanceFormValid = false;
    isEditMode: boolean = false;
    currentFinanceDataId: any;
    stocks: any;
    partnerId: any;
    tenantId: any;
    unitId: any;
    loading: boolean = false;
    state: any;
    showApproveButton: boolean = false;
    routeName: any;
    approvalState: any;
    approvedData:any;
    selectedApproval:any;
    approvalComments: any;
    private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    public store: Store<State>,
    private route: ActivatedRoute,
    private updates$: Actions,
    private router: Router
  ) {
    this.route.parent.url.subscribe(url => {
      this.routeName = url[0].path;
    });
    
    this.sub = this.route.parent.params.subscribe(params => {
           
        this.partnerId = params["partnerId"];
        this.unitId = params["unitId"];
      });
      this.sub = this.route.parent.parent.params.subscribe(params => {
        this.tenantId = params["id"];
      })
      if (this.routeName == 'unit-approve'){
        this.breadCrumbs = [];
      }
      else if(this.unitId){
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
          'label': 'Partner Finance'
        }];
      } else {
        this.breadCrumbs = [{
          'label': 'Partners',
          'url': '#/home/business/partners'
        }, {
          'label': 'Partner Details',
          'url': '#/home/business/partner-view/' + this.partnerId + '/partner-summary'
        }, {
          'label': 'Partner Finance'
        }];
      }
  }

    ngOnInit(){
      let isApproverRole = false;
      if(this.unitId){
        isApproverRole = isApprover(this.route);
      }
      

      this.getAllStates();
      
      if(isApproverRole){
        this.showApproveButton = true;
        this.breadCrumbs =[];
        this.updates$.pipe(
          // TODO CHECK THE ACTIONS
          ofType<ActionApprovePartnerFinanceSuccess>(PartnersActionTypes.APPROVE_PARTNER_FINANCE_SUCCESS),
          tap(action =>
            this.handleApprovePartnerFinanceSuccess(action)
          )
        ).subscribe();

        this.store.dispatch(
          new ActionGetPartnerFinanceData({
            id: this.partnerId,
            tenantId: this.tenantId
          })
      );
        // let obj = this.state.currentApproval.data;
        // obj = JSON.parse(obj);
  
      
        // this.partnerFinanceData= obj;
        // this.populatePartnerAddressDetails(obj || {});

      } else {
          this.store.dispatch(
          new ActionGetPartnerFinanceData({
            id: this.partnerId,
            tenantId: this.tenantId
          })
      );
     
      }
      this.initEffects();
    }

    handleApprovePartnerFinanceSuccess(action){
      this.router.navigate(['/home/business/approvals/list']);
      
    }

    initEffects() {
      
      this.updates$.pipe(
        takeUntil(this.unsubscribe$),
        ofType<ActionRejectApprovalsSuccess>(ApprovalsActionTypes.REJECT_APPROVAL_SUCCESS),
        tap(action =>
          this.rejectApprovalsSuccessHandler(action)
        )
      ).subscribe();

        this.updates$.pipe(
          takeUntil(this.unsubscribe$),
            ofType<ActionGetPartnerFinanceDataSuccess>(PartnersActionTypes.GET_PARTNER_FINANCE_DATA_SUCCESS),
            tap(action =>{
                return  isApprover(this.route) ? this.handleGetPartnerFinanceSuccessApprovals(action) :this.handleGetFinanceDataSuccess(action);
            }
                
            )
        ).subscribe();
    }


    getAllStates() {

      this.store.pipe(select(selectAuthState), takeUntil(this.unsubscribe$))
      .subscribe((tenantState: any) => {
          console.log(tenantState);
          if(!this.tenantId){
            this.tenantId = tenantState.user.data.tenantId;
          }
      });


        this.store
            .pipe(select(selectHomeState), takeUntil(this.unsubscribe$))
            .subscribe((stocks: any) => {
                this.stocks = stocks.client;
            });

            this.store.pipe(select(selectPartners), takeUntil(this.unsubscribe$))
            .subscribe((partnerState: any) => {
              console.log(partnerState);
              this.loading = partnerState.loading;
              if(!this.showApproveButton){
                this.partnerFinanceData = partnerState.partnerFinanceData;
              }
            });

            this.store
            .pipe(select(selectClients), takeUntil(this.unsubscribe$))
            .subscribe((state: any) => {
              this.state = state;
            });

            this.store
            .pipe(select(selectApprovals), takeUntil(this.unsubscribe$))
            .subscribe((state: any) => {
              console.log('approvalState', state);
              this.approvalState = state;
            });

    }

    handleGetFinanceDataSuccess(action) {
        console.log(action);
        const partnerFinanceData = action.payload[0].data;
        this.partnerFinanceData = partnerFinanceData;
        //  this.partnerFinance  = partnerFinanceData;
        if (isObjectEmpty(partnerFinanceData) || !partnerFinanceData.bankingType) {
            this.statusForUpdate = "post";
        }
        else {
            this.statusForUpdate = "put";
            this.isEditMode = true;
            this.currentFinanceDataId = action.payload[0].data.id
        }
    }

      handleFormStatusChanges(event) {
        if(event === 'INVALID'){
          this.isFinanceFormValid = false;
        }
        else if(event === 'VALID'){
          this.isFinanceFormValid = true;
        }
      }
    

    updateFinance() {
      if(this.showApproveButton){
        const financeValue = this.partnerFinance.value;
        let obj = this.approvalState.currentApproval.data;
        obj = JSON.parse(obj);
        console.log(this.approvalState.currentApproval);
        let approvalId  = this.approvalState.currentApproval.id;
        const value = {
          ...obj,
          ...financeValue,
          tenantId: this.tenantId,
          statusForUpdate: this.approvalState.currentApproval.method,
          approvalId
        }
        this.store.dispatch(
          new ActionApprovePartnerFinance({
           value: value,
           tenantId: this.tenantId
          })
        );
      }else {
        const financeValue = this.partnerFinance.value;
        const value = {
            ...financeValue,
            id: this.partnerId,
            statusForUpdate: this.statusForUpdate,
            unitId: this.unitId
        };

        const payloadValue = this.isEditMode ? Object.assign({}, value, { id: this.currentFinanceDataId }) : value;
        this.store.dispatch(
            new ActionUpdatePartnerFinance({
                value: payloadValue,
                tenantId: this.tenantId
            })
        );
      }
       
    }

    rejectApprovalsSuccessHandler(action){
      this.router.navigate(['/home/business/approvals/list']);
    }
  
    rejectApproval(form){
      if (this.showApproveButton) {
        let rejChange = this.approvalState.currentApproval; 
        this.store.dispatch(new ActionRejectApprovals({
          ...rejChange
        }));
      }
    }

      ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    handleGetPartnerFinanceSuccessApprovals(action){
      console.log(action.payload[0], 'inside approval get');
      const approvals = action.payload[0].data.approvals;
      const currentApproval = this.approvalState.currentApproval;
      this.approvedData = action.payload[0].data;
      let existingData = this.approvedData;
  
      this.breadCrumbs = [];
  
      let obj = approvals && approvals.filter(appr => {
        return (appr.approvalId == currentApproval.id);
      })[0];
      
      if(!obj){
          obj = action.payload[0].data;
      }
      this.selectedApproval = obj;
       const partnerFinanceData = obj;
       
       this.partnerFinanceData = partnerFinanceData;
      let approvalComments = this.approvalComments;
      let formCtrls = this.partnerFinance.value;
      this.approvalComments = createApprovalComments(formCtrls, currentApproval, existingData, obj);
      console.log(this.approvalComments);
    }
}