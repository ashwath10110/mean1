import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from '@app/state/home/home.state';
import { Subject, of } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { ActionGetDepartments } from '@app/state/specialities/specialities.actions';
import { ApprovalsService } from '@app/state/approvals/approvals.service';
import { ApprovalsFacade } from '@app/state/approvals/approvals.facade';
import { ActionRejectApprovals, ApprovalsActionTypes, ActionRejectApprovalsSuccess, ActionBulkApproveSuccess } from '@app/state/approvals/approvals.actions';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-approvals-list',
  templateUrl: './approvals-list.component.html',
  styleUrls: ['./approvals-list.component.css']
})
export class ApprovalsListComponent implements OnInit {

  private unsubscribe$: Subject<void> = new Subject<void>();

  allApprovals$ = this.approvalsFacade.allApprovals$;
  loading$ = this.approvalsFacade.loading$;

  selectedValue: any;
  hasSelectCheckbox = true;
  hasExpander = false;
  sections: any[] = [];
  methods: any[] = [];
  cols: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private updates$: Actions,
    public store: Store<State>,
    public approvalsService: ApprovalsService,
    public approvalsFacade: ApprovalsFacade,
  ) { }

  ngOnInit() {
    this.allApprovals$ = this.approvalsFacade.allApprovals$;
    this.initializeContent();
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionRejectApprovalsSuccess>(ApprovalsActionTypes.REJECT_APPROVAL_SUCCESS),
      tap(action =>
        this.rejectApprovalsSuccessHandler(action)
      )
    ).subscribe();
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionBulkApproveSuccess>(ApprovalsActionTypes.BULK_APPROVE_SUCCESS),
      tap(action =>
        this.bulkApprovalsSuccessHandler(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionBulkApproveSuccess>(ApprovalsActionTypes.BULK_REJECT_SUCCESS),
      tap(action =>
        this.bulkRejectSuccessHandler(action)
      )
    ).subscribe();
    this.initConfigForPTable();
  }

  initializeContent(){
    this.approvalsFacade.getAllApprovals();
    this.store.dispatch(
      new ActionGetDepartments(
        {}
      )
    );
  }

  myfilter(event) {
    console.log(event);
  }

  onRowSelect(event) {
    console.log(event);
  }

  bulkApprovalsSuccessHandler(action){
    this.approvalsFacade.getAllApprovals();
  }

  bulkRejectSuccessHandler(action){
    this.approvalsFacade.getAllApprovals();
  }

  rejectApprovalsSuccessHandler(action){
    this.initializeContent();
  }

  initConfigForPTable() {
    this.sections = [
      { label: "Updated Section", value: null },
      { label: "UNIT DETAILS", value: "UNIT_DETAILS" },
      { label: "UNIT FINANCE DETAILS", value: "UNIT_FINANCE_DETAILS"},
      { label: "UNIT ADDRESS DETAILS", value: "UNIT_CONTACT_DETAILS"},
      { label: "UNIT SPECIALIZATIONS", value: "UNIT_SPECIALIZATIONS"},
      { label: "DOCTOR DETAILS", value: "DOCTOR_DETAILS" },
      { label: "USER DETAILS", value: "UNIT_USER_DETAILS"},
      { label: "UNIT MEDIA", value: "UNIT_MEDIA"},
      { label: "PARTNER DETAILS", value: "PARTNER_DETAILS" },
      { label: "PARTNER FINANCE DETAILS", value: "PARTNER_FINANCE_DETAILS" },
      { label: "PARTNER CONTACT DETAILS", value: "PARTNER_CONTACT_DETAILS" },
      { label: "PARTNER CONTACT PERSON DETAILS", value: "PARTNER_CONTACT_PERSON_DETAILS" }
    ];

    this.methods = [
      { label: "Approval type", value: null },
      { label: "CREATE NEW ENTRY", value: "POST" },
      { label: "UPDATE DETAILS", value: "PUT" }
    ]

    //Previous display columns [position', 'submittedBy', 'submittedOn', 'externalId', 'status', 'action']
    // No.
    // Name
    // Requested On
    // Details
    // Status
    // Action
    this.cols = [
      {
        field: "requestedUser.firstName",
        header: "Submitted By",
        sortable: true,
        hasFilter: false,
        filterPlaceholder: null,
        filterMatchMode: "contains",
        hasDropdownFilter: null,
        hasMultiSelectFilter: null,
        dropdownItems: null
      },
      {
        field: "requestedAt",
        header: "Requested On",
        sortable: true,
        hasFilter: false,
        filterPlaceholder: null,
        filterMatchMode: "contains",
        hasDropdownFilter: null,
        hasMultiSelectFilter: null,
        dropdownItems: null
      },
      {
        field: "section",
        header: "Section",
        sortable: false,
        hasFilter: false,
        filterPlaceholder: null,
        filterMatchMode: "equals",
        hasMultiSelectFilter: null,
        hasDropdownFilter: true,
        dropdownItems: this.sections
      },
      {
        field: "method",
        header: "Approval Type",
        sortable: false,
        hasFilter: false,
        filterPlaceholder: null,
        filterMatchMode: "equals",
        hasMultiSelectFilter: null,
        hasDropdownFilter: true,
        dropdownItems: this.methods
      },
      {
        field: "actions",
        header: "Actions",
        sortable: false,
        hasFilter: false,
        filterPlaceholder: null,
        filterMatchMode: "equals",
        hasMultiSelectFilter: null,
        hasDropdownFilter: null,
        dropdownItems: null
      }
      
    ];
  }

  handleBulkApprove() {
    this.approvalsFacade.bulkApprovals(this.selectedValue);
  }

  handleBulkReject() {
    this.approvalsFacade.bulkRejects(this.selectedValue);
  }

  handleApprove(approvalObj) {
    this.proceedToApprove(approvalObj);
  }

  rejectApproval(approval) {
    this.store.dispatch(new ActionRejectApprovals({
      ...approval
    }));
  }

  proceedToApprove(approval) {

    let tenantId = approval.clientId || "currentClient";
    let data = JSON.parse(approval.data);
    let unitId = data.id;

    this.approvalsFacade.saveCurrentApprovalToState({ approval: approval });

    switch (approval.section) {

      case "UNIT_DETAILS": {
        this.router.navigate(['home/business/unit-approve/' + tenantId + '/unit-account-setup/' + unitId]);
        break;
      }

      case "UNIT_CONTACT_DETAILS": {
        this.router.navigate(['home/business/unit-approve/' + tenantId + '/unit-address-details/' + unitId]);
        break;
      }

      case "UNIT_MEDIA": {
        this.router.navigate(['home/business/unit-approve/' + tenantId + '/unit-media/' + unitId]);
        break;
      }

      case "UNIT_FINANCE_DETAILS": {
        this.router.navigate(['home/business/unit-approve/' + tenantId + '/unit-finance/' + unitId]);
        break;
      }

      case "UNIT_SPECIALIZATIONS": {
        this.router.navigate(['home/business/unit-approve/' + tenantId + '/unit-specialities/' + unitId]);
        break;
      }

      case "PARTNER_DETAILS": {
        let tenantId = approval.clientId || "currentClient";
        let data = JSON.parse(approval.data);
        let unitId = data.unitId;
        let partnerId = data.id;
        const url = `home/business/unit-approve/${tenantId}/unit-partners/${unitId}/partner-view/${partnerId}/partner-details`
        this.router.navigate([url]);

        break;
      }

      case "DOCTOR_DETAILS": {
        this.router.navigate(['home/business/unit-approve/' + tenantId + '/unit-doctors/' + unitId]);
        break;
      }

      case "PARTNER_CONTACT_DETAILS": {
        let tenantId = approval.clientId || "currentClient";
        let data = JSON.parse(approval.data);
        let unitId = data.unitId;
        let partnerId = data.id;
        const url = `home/business/unit-approve/${tenantId}/unit-partners/${unitId}/partner-view/${partnerId}/partner-address`
        this.router.navigate([url]);

        break;
      }

      case "PARTNER_FINANCE_DETAILS": {
        let tenantId = approval.clientId || "currentClient";
        let data = JSON.parse(approval.data);
        let unitId = data.unitId;
        let partnerId = data.id;
        const url = `home/business/unit-approve/${tenantId}/unit-partners/${unitId}/partner-view/${partnerId}/partner-finance`
        this.router.navigate([url]);

        break;
      }

      case "UNIT_USER_DETAILS": {
        this.router.navigate(['home/business/unit-approve/' + tenantId + '/unit-users/' + unitId]);
        break;
      }

      case "PARTNER_CONTACT_PERSON_DETAILS": {
        let tenantId = approval.clientId || "currentClient";
        let data = JSON.parse(approval.data);
        let unitId = data.unitId;
        let partnerId = data.id;
        const url = `home/business/unit-approve/${tenantId}/unit-partners/${unitId}/partner-view/${partnerId}/partner-contact-person`
        this.router.navigate([url]);

        break;
      }

      default: {
        alert("Not handled, plz check");
        break;
      }
    }

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
