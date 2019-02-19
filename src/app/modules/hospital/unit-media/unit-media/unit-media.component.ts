import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { takeUntil, tap } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from '@app/state/home/home.state';

import { MatDialog } from '@angular/material';

import { EditMediaItemComponent } from '@app/common/media-upload/edit-media-item/edit-media-item.component';
import { selectMedia } from '@app/state/media/media.selectors';
import { ActionGetMedia, ActionUploadMedia, ActionUploadMediaSuccess, MediaActionTypes, ActionGetMediaSuccess, ActionApproveUploadMedia } from '@app/state/media/media.actions';
import { mediaTypes } from 'api-config';
import { selectApprovals } from '@app/state/approvals/approvals.selectors';
import { MediaService } from '@app/state/media/media.service';
import { diffOfTwoSTringArrays } from '@app/utils/obj-utils';
import { ActionRejectApprovals, ActionRejectApprovalsSuccess, ApprovalsActionTypes } from '@app/state/approvals/approvals.actions';
import { MessageModalComponent } from '@app/common/message-modal/message-modal.component';

@Component({
  selector: 'app-unit-media',
  templateUrl: './unit-media.component.html',
  styleUrls: ['./unit-media.component.css']
})
export class UnitMediaComponent implements OnInit {

  private unsubscribe$: Subject<void> = new Subject<void>();

  state;
  approvalState;

  breadCrumbs = [];
  fileTypes = mediaTypes;
  sub: any;
  tenantId: any;
  unitId: any;
  uumid: any;

  statusForUpdate: any;

  attachmentIds = [];

  approvalComments = {};

  showApproveButton = false;
  routeName = "";

  approvedData: any;
  selectedApproval: any;

  constructor(
    public store: Store<State>,
    private updates$: Actions,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private mediaService: MediaService
  ) {
  }

  ngOnInit() {

    this.initRouteIdBreadCrumb()

    this.store
      .pipe(select(selectMedia), takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        this.state = state;
        // this.attachmentIds = state.mediaList.map(ele => {
        //   return ele.id;
        // });
      });

    this.store
      .pipe(select(selectApprovals), takeUntil(this.unsubscribe$))
      .subscribe((state: any) => {
        this.approvalState = state;
      });

    if (this.routeName === 'unit-approve') {
      this.handleApprovalRoute();
    }
    else {
      this.handleNonApprovalRoute();
    }
  }

  initRouteIdBreadCrumb() {
    this.sub = this.route.params.subscribe(params => {
      this.unitId = params["unitId"];
    });
    this.sub = this.route.parent.params.subscribe(params => {
      this.tenantId = params["id"];
    });
    this.breadCrumbs = [{
      'label': 'Org Chart',
      'url': `#/home/business/hospital-info/${this.tenantId}`
    }, {
      'label': 'Unit Details',
      'url': '#/home/business/unit-view/' + this.tenantId + '/unit-summary/' + this.unitId
    }, {
      'label': 'Unit Media'
    }];

    this.route.parent.url.subscribe(url => {
      this.routeName = url[0].path;
    });

  }

  handleNonApprovalRoute() {

    //Get page data
    this.initGetUnitMediaAttachments();
    // this.attachmentIds = state.mediaList.map(ele => {
    //   return ele.id;
    // });
    // });
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionUploadMediaSuccess>(MediaActionTypes.UPLOAD_MEDIA_SUCCESS),
      tap(action =>
        this.uploadMediaSuccess(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetMediaSuccess>(MediaActionTypes.GET_MEDIA_SUCCESS),
      tap(action =>
        this.handleGetUnitMediaSuccess(action)
      )
    ).subscribe();

  }

  rejectApprovalsSuccessHandler(action) {
    this.router.navigate(['/home/business/approvals/list']);
  }

  handleApprovalRoute() {
    //Get page data
    this.initGetUnitMediaAttachments();

    //Initialise effect for this.
    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionGetMediaSuccess>(MediaActionTypes.GET_MEDIA_SUCCESS),
      tap(action =>
        this.handleGetUnitMediaSuccessApprovals(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionApproveUploadMedia>(MediaActionTypes.APPROVE_UPLOAD_MEDIA_SUCCESS),
      tap(action =>
        this.handleApproveMediaSuccess(action)
      )
    ).subscribe();

    this.updates$.pipe(
      takeUntil(this.unsubscribe$),
      ofType<ActionRejectApprovalsSuccess>(ApprovalsActionTypes.REJECT_APPROVAL_SUCCESS),
      tap(action =>
        this.rejectApprovalsSuccessHandler(action)
      )
    ).subscribe();

    this.showApproveButton = true;
  }

  handleApproveMediaSuccess(action){
    debugger;
    const hasApprovalId = action.payload.data.approvalId;
    if (!hasApprovalId) {
      this.showDialog("unit-media-success", action);
    }
    else {
      this.showDialog("unit-media-for-approval", action);
    }
  }

  showDialog(name, action) {
    if (name == "unit-media-success") {
      const dialogRef = this.dialog.open(MessageModalComponent, {
        width: '300px',
        data: {
          name: name,
          data: {
            specialisations: action.payload.data
          }
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.status) {
          if (result.message == "success") {
           if (this.routeName == 'unit-view') {
            this.router.navigate(['home/business/unit-view/' + this.tenantId + '/unit-summary/' + this.unitId]);
           }
           else if (this.routeName == 'unit-setup'){
            //this.router.navigate(['home/business/unit-setup/' + this.tenantId + '/unit-finance/' + this.unitId]);
           }
           else if (this.routeName == 'unit-approve'){
              this.router.navigate(['/home/business/approvals/list']);
           }
          }
        }
        else if (result && !result.status) {
          if (result.message == "cancel") {

          }
        }
      });
    }

    else if (name == "unit-media-for-approval") {
      const dialogRef = this.dialog.open(MessageModalComponent, {
        width: '300px',
        data: {
          name: name,
          data: {
            specialisations: action.payload.data
          }
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.status) {
          if (result.message == "success") {
            this.router.navigate(['home/business/unit-view/' + this.tenantId + '/unit-summary/' + this.unitId]);
          }
        }
        else if (result && !result.status) {
          if (result.message == "cancel") {

          }
        }
      });
    }
  }
  
  handleGetUnitMediaSuccess(action) {
    this.attachmentIds = action.payload.data.media.map(ele => {
      return ele.id;
    });
  }

  handleGetUnitMediaSuccessApprovals(action) {
    const approvals = action.payload.data.approvals;
    const currentApproval = this.approvalState.currentApproval;
    this.approvedData = action.payload.data;
    let existingData = this.approvedData;

    this.breadCrumbs = [];

    const obj = approvals.filter(appr => {
      return (appr.approvalId == currentApproval.id);
    })[0];

    this.selectedApproval = obj;

    this.attachmentIds = obj.attachmentIds;

    let prevAttachmentsIds = existingData.attachmentIds;
    let existingAttachmentsIds = obj.attachmentIds;

    let diffIds = diffOfTwoSTringArrays(prevAttachmentsIds, existingAttachmentsIds);
    let approvalComments = {};

    this.getMediaList(diffIds.added, diffIds.removed, this.tenantId).subscribe(data => {
      let addedData = data[0].data;
      let removedData = data[1].data;
      let count = 1;
      addedData.forEach(media => {
        approvalComments[count++ + ' - Media Added -- >'] = media.tag;
      });
      removedData.forEach(media => {
        approvalComments[count++ + ' - Media Removed -- >'] = media.tag;
      });
      this.approvalComments = approvalComments;
    });
  }

  getMediaList(oldIds, newIds, tenantId) {
    let oldIds$ = this.mediaService.getFileMetaData(oldIds, tenantId);
    let newIds$ = this.mediaService.getFileMetaData(newIds, tenantId);
    return forkJoin([oldIds$, newIds$]);
  }

  initGetUnitMediaAttachments() {
    this.store.dispatch(
      new ActionGetMedia({
        tenantId: this.tenantId,
        unitId: this.unitId
      })
    );
  }

  uploadMediaSuccess(action) {
    this.initGetUnitMediaAttachments();
    //Need to put growl here.
  }

  // addAttachment() {
  //   const dialogRef = this.dialog.open(EditMediaItemComponent, {
  //     width: '800px',
  //     data: {
  //       attachment: event,
  //       status: 'edit',
  //       unitsList: this.state.unitsList,
  //       attachmentIds: this.attachmentIds,
  //       unitId: this.unitId,
  //       tenantId: this.tenantId,
  //       statusForUpdate: 'put'
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //   });
  // }

  handleFileUpload(evt) {
    this.attachmentIds = evt.attachmentIds;
    // if(this.showApproveButton){
    //   const approvalId = this.approvalState.currentApproval.id;
    //   this.store.dispatch(
    //     new ActionApproveUploadMedia({
    //       tenantId: this.tenantId,
    //       unitId: this.unitId,
    //       id: this.attachmentIds,
    //       approvalId
    //     })
    //   );
    // }
    // else {
    if (evt.status === "UPLOAD_SUCCESSFULL") {
      this.store.dispatch(
        new ActionUploadMedia({
          tenantId: this.tenantId,
          unitId: this.unitId,
          id: this.attachmentIds
        })
      );
    }
  // }
  }
  approveApproval(evt){
    //this.attachmentIds = evt.attachmentIds;
      const approvalId = this.approvalState.currentApproval.id;
      this.store.dispatch(
        new ActionApproveUploadMedia({
          tenantId: this.tenantId,
          unitId: this.unitId,
          id: this.attachmentIds,
          approvalId
        })
      );
   
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

}
