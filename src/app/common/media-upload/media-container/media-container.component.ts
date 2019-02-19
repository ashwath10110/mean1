import { Component, OnInit, Renderer, ViewChild, SimpleChanges } from '@angular/core';
import { Output, EventEmitter, Input } from '@angular/core';

import { MediaService } from '@app/state/media/media.service';
import { MatDialog } from '@angular/material';
import { EditMediaItemComponent } from '@app/common/media-upload/edit-media-item/edit-media-item.component';

@Component({
  selector: 'app-media-container',
  templateUrl: './media-container.component.html',
  styleUrls: ['./media-container.component.css']
})
export class MediaContainerComponent implements OnInit {

  @Input() attachmentIds: any = [];
  @Input() fileTypes = [];
  @Input() tenantId = '';
  @Input() maxSizeInKb = 200;

  @Input() attachmentObj = [];
  @Input() acceptIds = false;

  @Input() metaDataList = [];

  @Output('updates') updates: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private clientsService: MediaService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.attachmentIds && changes.attachmentIds.currentValue) {
      this.attachmentIds = changes.attachmentIds.currentValue || [];
      if (this.attachmentIds.length) {
        this.loadData(this.attachmentIds);
      }
    }
  }

  loadData(ids) {
    this.clientsService.getFileMetaData(ids, this.tenantId).subscribe(data => {
      this.metaDataList = data.data || [];
    });
  }

  addAttachment() {
    const dialogRef = this.dialog.open(EditMediaItemComponent, {
      width: '800px',
      data: {
        attachment: event,
        status: 'edit',
        attachmentIds: this.attachmentIds,
        fileTypes: this.fileTypes,
        tenantId: this.tenantId,
        statusForUpdate: 'put'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        this.attachmentIds = this.attachmentIds || [];
        this.attachmentIds = [...this.attachmentIds, ...result.ids];
        this.updates.emit({
          status: 'UPLOAD_SUCCESSFULL',
          attachmentIds: this.attachmentIds,
          uploadStatus: true
        });
        this.loadData(this.attachmentIds);
      }
    });
  }

  handleViewMedia(attachment) {
    this.clientsService.downloadFile(attachment, this.tenantId).subscribe(function (data) {
      let anchorTmp = document.createElement("a"),
        objectUrl = window.URL.createObjectURL(data[0]);
      anchorTmp.href = objectUrl;
      anchorTmp.download = data[1].tag;
      anchorTmp.click();
      window.URL.revokeObjectURL(objectUrl);
      anchorTmp.remove();
    });
  }

  handleDeleteMedia(attachment) {
    this.attachmentIds = this.attachmentIds.filter((data) => data!=attachment.id)
    this.metaDataList = this.metaDataList.filter((data) => data.id!=attachment.id)
    this.updates.emit({
      status: 'UPLOAD_SUCCESSFULL',
      attachmentIds: this.attachmentIds,
      uploadStatus: true
    });
  }

  downloadMediaFn(item) {
    this.clientsService.downloadFile(item.id, this.tenantId).subscribe(data => { });
  }

}
