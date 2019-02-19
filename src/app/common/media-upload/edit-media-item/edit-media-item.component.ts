import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { EditUserComponent } from '@app/modules/hospital/users/edit-user/edit-user.component';

@Component({
  selector: 'app-edit-media-item',
  templateUrl: './edit-media-item.component.html',
  styleUrls: ['./edit-media-item.component.css']
})
export class EditMediaItemComponent implements OnInit {

  private unsubscribe$: Subject<void> = new Subject<void>();

  tenantId = '';

  attachmentIds = [];
  maxSizeInKb = 2048;

  uploadStatus = false;

  fileTypes = [];

  acceptIds = true;

  @Output() updates: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.tenantId = this.data.tenantId || '';
    this.attachmentIds = this.data.attachmentIds || [];
    this.fileTypes = this.data.fileTypes;
  }

  ngOnInit() {}

  handleFileUpload(evt) {
    if (evt.status === "UPLOAD_SUCCESSFULL") {
      this.attachmentIds = evt.attachmentIds;
      this.uploadStatus = true;
      this.dialogRef.close({
        status: true,
        ids: this.attachmentIds
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
