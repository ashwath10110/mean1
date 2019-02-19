import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent {

  name = "";
  compData = {};

  constructor(
    public dialogRef: MatDialogRef<MessageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.name = this.data.name;
    this.compData = this.data.data;
  }

  onNoClick(name): void {
    this.dialogRef.close({
      status: false,
      fromPage: name,
      message: "cancel"
    });
    if (name === 'contract') {
      this.dialogRef.close({
        status: false,
        fromPage: name,
        message: "cancel"
      });
    } else if (name === 'partner') {
      this.dialogRef.close({
        status: false,
        fromPage: name,
        message: "cancel"
      });
    }
    else if (name === 'unit-user-map') {

    }
    else if (name === 'del-user-all-units') {

    }

    if (name === 'unit-specialities-success') {
      this.dialogRef.close({
        status: false,
        fromPage: name,
        message: "cancel",
        name: name
      });
    }
    if (name === 'specialites-for-approval') {
      this.dialogRef.close({
        status: false,
        fromPage: name,
        message: "cancel",
        name: name
      });
    }

    if (name === 'client-contact-person') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "cancel",
        name: name
      });
    }

    if (name === 'delete-client-contact') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "cancel",
        name: name
      });
    }

    if(name === 'check-delete-client-contact'){
      this.dialogRef.close({
        status: false,
        fromPage: name,
        message: "cancel",
        name: name
      });
    }
  }

  onYesClick() {
    this.dialogRef.close({
      status: true
    });
  }

  onAddDepartmentsClick() {
    this.dialogRef.close({
      status: true,
      message: "add-departments"
    });
  }

  onProceedClick() {
    this.dialogRef.close({
      status: true,
      message: "proceed",
    });
  }

  onSetupAgain(name) {
    if (name === 'contract') {
      this.dialogRef.close({
        status: false,
        fromPage: name,
        message: "setup-again",
      });
    }
    if (name === 'admin-account') {
      this.dialogRef.close({
        status: false,
        fromPage: name,
        message: "setup-again",
      });
    }
    if (name === 'org-tree') {
      this.dialogRef.close({
        status: false,
        fromPage: name,
        message: "proceed",
      });
    }

  }

  addMore(name) {
    if (name === 'doctors') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "add-more",
        name: name
      });
    }
    if (name === 'users') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "add-more",
        name: name
      });
    }
  }

  onProceed(name) {
    if (name === 'contract') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }
    if (name === 'admin-account') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }
    if (name === 'org-tree') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'client-data') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'client-address-setup') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'client-finance-setup') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'client-contact-setup') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'client-finance') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'client-admin-user') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'client-detail') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'client-contact-person') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'delete-client-contact') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'check-delete-client-contact') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'client-contract-success') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'specialities') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'unit-specialities-success') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }
    if (name === 'specialites-for-approval') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'unit-creation-successfull') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'unit-details-success') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }
    
    if (name === 'unit-details-approval') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'unit-address-success') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }
    if (name === 'unit-address-approval') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'unit-media-success') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }
    
    if (name === 'unit-media-approval') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'partner-finance-success-modal') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'partner-details-success-modal') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name,
        approvalId: this.data.approvalId
      });
    }

    if (name === 'users') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'doctors') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'unit-finance') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'unit-finance-approval') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'CreateAdminUserSuccess') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }
    if (name === 'unit-user-map') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'del-user-all-units') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'partner-address-success-modal') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name,
        approvalId: this.data.approvalId
      });
    }


    if (name === 'partner-contact-person-details-success-modal') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name,
        approvalId: this.data.approvalId
      });
    }

    if (name === 'unit-sent-for-approvals') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    if (name === 'partner-details-submitted-for-approval') {
      this.dialogRef.close({
        status: true,
        fromPage: name,
        message: "success",
        name: name
      });
    }

    



  }

}
