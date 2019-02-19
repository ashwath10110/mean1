import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { State, selectHomeState } from '@app/state/home/home.state';
import { ActionGetTenantUnits } from '@app/state/units/units.actions';
import { ActionGetPartnerDetails, ActionGetPartnerDetailsSuccess, PartnersActionTypes, ActionCreatePartner, ActionApprovePartnerDetailsSuccess, ActionApprovePartnerDetails } from '@app/state/partners/partners.actions';
import { isObjectEmpty} from '@app/utils/obj-utils';
import { selectPartners } from '@app/state/partners/partners.selectors';
import { selectUnits } from '@app/state/units/units.selectors';
import { selectAuthState } from '@app/core';
import { selectClients } from '@app/state/clients/clients.selectors';
import { PartnerUtils } from '@app/utils/partner-utils';
import { ActionApproveUnitDetails } from '@app/state/details/details.actions';
import { selectApprovals } from '@app/state/approvals/approvals.selectors';
import { ActionRejectApprovalsSuccess, ApprovalsActionTypes, ActionRejectApprovals } from '@app/state/approvals/approvals.actions';
@Component({
  selector: 'app-partner-details',
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.scss']
})

export class PartnerDetailsComponent implements OnInit {

    partnerInfoFormGroup: FormGroup;
    partnerData: any;
    showApproveButton = false;
    routeName = "";
    showAddAttachment = true;

  @Output() updates: EventEmitter<any> = new EventEmitter<any>();
  private unsubscribe$: Subject<void> = new Subject<void>();

    sub: any;
    stocks: any;
    breadCrumbs = [];
    statusForUpdate = "";
    hospitalUnits: any =[]; 
    partnerTypes: any =[];
    roles: any;
    countries: any =[];
    partnerRole: string;
    tenantId: any;
    partnerId: any;
    unitId: any;
    loading: boolean = false;
    attachments = [];
    attachmentIds = [];
    maxSizeInKb = 2048;
    state:any;
    fileTypes: any = [];
    uploadStatus: boolean =false;
    approvalMethod: string;

    approvalState:any;
    approvedData: any;
    selectedApproval:any;
    approvalComments: any;

    constructor(
        public store: Store<State>,
        private _formBuilder: FormBuilder,
        private updates$: Actions,
        private router: Router,
        public dialog: MatDialog,
        private route: ActivatedRoute
      ) {

          this.sub = this.route.parent.params.subscribe(params => {   
            this.partnerId = params["partnerId"];
            this.unitId = params["unitId"];
          });


          this.sub = this.route.parent.parent.params.subscribe(params => {
            this.tenantId = params["id"];
          });

          // BreadCrumbs
          if(this.unitId){
            this.breadCrumbs = [{
              'label': 'Org Chart',
              'url': `#/home/business/hospital-info/${this.tenantId}`
            },{
              'label': 'Partners',
              'url': `#/home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}`
            }, {
              'label': 'Partner Details',
              'url': `#/home/business/unit-view/${this.tenantId}/unit-partners/${this.unitId}/partner-view/${this.partnerId}/partner-summary`
            }, {
              'label': 'Partner Info'
            }];

          } else {

            this.breadCrumbs = [{
              'label': 'Partners',
              'url': '#/home/business/partners'
            }, {
              'label': 'Partner Details',
              'url': '#/home/business/partner-view/' + this.partnerId + '/partner-summary'
            }, {
              'label': 'Partner Info'
            }];
          }
        
          // Route Path
          this.route.parent.parent.url.subscribe(url => {
            this.routeName = url[0].path;
          });
      
        // Assigning Roles etc
        this.roles = PartnerUtils.getRoles();
        this.partnerTypes = PartnerUtils.getPartnerTypesList();
        this.fileTypes = this.getFileTypes();

        
        this.store.pipe(select(selectPartners), takeUntil(this.unsubscribe$))
        .subscribe((partnerState: any) => {
            console.log(partnerState);
            this.loading = partnerState.loading;
        });
        this.store.pipe(select(selectAuthState), takeUntil(this.unsubscribe$))
        .subscribe((tenantState: any) => {
            console.log(tenantState);
            if(!this.tenantId){
              this.tenantId = tenantState.user.data.tenantId;
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



     
  ngOnInit() {
    //To Set the form
    this.getFormGroupObj();
    
        if (this.routeName != 'unit-approve') {
          this.store.dispatch(
            new ActionGetPartnerDetails({ id: this.partnerId, tenantId: this.tenantId })
          );
        
        } else {

          this.store.dispatch(
            new ActionGetTenantUnits({
              tenantId: this.tenantId
            })
          );

          this.store.dispatch(
            new ActionGetPartnerDetails({ id: this.partnerId, tenantId: this.tenantId })
          );

          //Approve Partner Unit Details SuccessCode Comes here...
          this.updates$.pipe(
            // TODO CHECK THE ACTIONS
            ofType<ActionApprovePartnerDetailsSuccess>(PartnersActionTypes.APPROVE_PARTNER_DETAILS_SUCCESS),
            tap(action =>
              this.handleApprovePartnerDetailsSuccess(action)
            )
          ).subscribe();
    
          // let obj = this.state.currentApproval.data;
          // obj = JSON.parse(obj);
          // console.log(obj);
           this.showApproveButton = true;
          // this.approvalMethod  = this.state.currentApproval.method;
          //  this.populatePartnerInfo(obj || {});



    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionRejectApprovalsSuccess>(ApprovalsActionTypes.REJECT_APPROVAL_SUCCESS),
      tap(action =>
        this.rejectApprovalsSuccessHandler(action)
      )
    ).subscribe();
        }

        this.initEffects();


        this.store
          .pipe(select(selectUnits), takeUntil(this.unsubscribe$))
          .subscribe((stocks: any) => {
            this.stocks = stocks;
            this.getHospitalUnitsList();
          });
         
      }

    initEffects() {
        this.updates$.pipe(
            ofType<ActionGetPartnerDetailsSuccess>(PartnersActionTypes.GET_PARTNER_SUCCESS),
            tap(action =>{
              return (this.routeName !== 'unit-approve') ? this.handleGetPartnerDetailsSuccess(action) : this.handleGetPartnerDetailsSuccessApprovals(action);
            }
              
            )
          ).subscribe();
      }

      handleApprovePartnerDetailsSuccess(action){
        this.router.navigate(['/home/business/approvals/list']);
      }

      handleGetPartnerDetailsSuccess(action) {
        const partnerData = action.payload[0].data;
        this.partnerData = partnerData;
            if (isObjectEmpty(partnerData)) {
            this.statusForUpdate = "post";
            }
            else {
            this.statusForUpdate = "put";
            }
            console.log(partnerData);
            this.populatePartnerInfo(partnerData || {});
  }
      
  rejectApprovalsSuccessHandler(action){
    this.router.navigate(['/home/business/approvals/list']);
  }
      getFormGroupObj(){
        const emailRegEx = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
        const alphaNumericRegex = '^[a-z0-9A-Z]*$';
        this.partnerInfoFormGroup = this._formBuilder.group({
           unitId: ['', Validators.required],
           name: ['', [Validators.required, Validators.maxLength(30)]],
           partnerType: ['', Validators.required],
           partnerRole: ['', Validators.required],
            cin: ['', [Validators.pattern('^([L|U]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$')  , Validators.maxLength(21)]],
            gstin: ['', [Validators.required, Validators.maxLength(21), Validators.pattern('^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')]],
            pan: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^([A-Za-z]{5})([0-9]{4})([A-Za-z]{1})$')]],
            agreementStartDate: ['']
          });
        }

      onSubmitPartnerInfo(form){

        if(this.showApproveButton) {
          let statusForUpdate = this.approvalState.currentApproval.method;
          const id = this.selectedApproval.id;
          const approvalId = this.selectedApproval.approvalId;
          // let obj = this.state.currentApproval.data;
          // obj = JSON.parse(obj);
          // console.log(this.state.currentApproval);
          // let approvalId  = this.state.currentApproval.id;
          const value  = {
            ...form.value,
            id,
            unitId: this.unitId,
            tenantId: this.tenantId,
            attachmentids: this.attachmentIds,
            statusForUpdate: statusForUpdate,
            approvalId
          }
          this.store.dispatch(
            new ActionApprovePartnerDetails({
            value: value,
            tenantId: this.tenantId
            })
          );

        } else {
          
           const value = {
             ...form.value,
             statusForUpdate: this.statusForUpdate,
             id: this.partnerId,
             attachmentids: this.attachmentIds
           };
   
          
           this.store.dispatch(
             new ActionCreatePartner({
               value: value,
               tenantId: this.tenantId
             })
           );
        }    
      }
    
      getHospitalUnitsList(){
        const unitData = this.stocks.unitsList;
        const finalArray = []; 
        unitData && unitData.forEach(data => {
          const unit = PartnerUtils.createHospitalUnit(data);
           finalArray.push(unit);
        });
        this.hospitalUnits = finalArray;
       }

      populatePartnerInfo(obj){
        let  name = obj.name || "";
        let partnerType = obj.partnerType || "";
        let partnerRole = obj.partnerRole || "";
        let unitId = obj.unitId || "";
        let cin = obj.cin || "";
        let pan = obj.pan || "";
        let gstin = obj.gstin || "";
        let agreementStartDate = obj.agreementStartDate ? new Date(obj.agreementStartDate) : "";
        let attachmentIds = obj.attachmentids ? obj.attachmentids : [];
        this.partnerInfoFormGroup.patchValue({
          name: name,
          partnerType: partnerType,
          partnerRole: partnerRole,
          unitId: unitId,
          cin: cin,
          pan: pan,
          gstin: gstin,
          agreementStartDate: agreementStartDate,
        });

        this.attachmentIds = attachmentIds;
        console.log(this.attachmentIds);
        }

        getFileTypes() {
          return [{
            value: 0,
            name: 'Aggrement Document'
          }];
        }

        showAttachmentButton(){
          this.showAddAttachment = true;
        }

        hideAddAttachments(){
          this.showAddAttachment = false;
        }

        handleFileUpload(evt) {
          if (evt.status === "UPLOAD_SUCCESSFULL") {
            this.attachmentIds = evt.attachmentIds;
            this.uploadStatus = true;
          }
        }

        restrictAttachmentSectionBasedOnApprovals(){
          if(this.showApproveButton){
              return this.approvalMethod !== 'POST';
          }
          return true;
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

  handleGetPartnerDetailsSuccessApprovals(action){
    console.log(action.payload[0]);
    const approvals = action.payload[0].data.approvals;
    const currentApproval = this.approvalState.currentApproval;
    this.approvalMethod = this.approvalState.currentApproval.method;
    this.approvedData = action.payload[0].data;
    let existingData = this.approvedData;
    let AggrementStarteDate = existingData['agreementStartDate'];
    existingData['agreementStartDate'] = new Date(AggrementStarteDate);

    this.breadCrumbs = [];

    let obj = approvals && approvals.filter(appr => {
      return (appr.approvalId == currentApproval.id);
    })[0];

    if(!obj){
      obj = action.payload[0].data;
    }

    this.selectedApproval = obj;
    this.populatePartnerInfo(obj || {});
    let approvalComments = this.approvalComments;
    let formCtrls = this.partnerInfoFormGroup.value;
    this.approvalComments = PartnerUtils.createApprovalComments(formCtrls, currentApproval, existingData, obj);
    console.log(this.approvalComments);
  }
}