import { Component, OnInit, Renderer, ViewChild, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { MediaService } from '@app/state/media/media.service';

@Component({
  selector: 'app-multifileupload',
  templateUrl: './multifileupload.component.html',
  styleUrls: ['./multifileupload.component.css'],
  providers: [MediaService]
})
export class MultifileuploadComponent implements OnInit {

  @Input() attachmentIds: any = [];
  @Input() fileTypes = [];
  @Input() tenantId = '';
  @Input() maxSizeInKb = 200;

  @Input() attachmentObj = [];
  @Input() acceptIds = false;

  loading = false;

  metaDataList = [];

  public documentGrp: FormGroup;
  public totalfiles: Array<File> = [];
  public totalFileName = [];
  public lengthCheckToaddMore = 0;

  @Output('updates') updates: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private renderer: Renderer,
    private formBuilder: FormBuilder,
    private mediaService: MediaService,
    private cd: ChangeDetectorRef
  ) {
    this.documentGrp = this.formBuilder.group({
      tag: [
        '',
        Validators.compose([Validators.required])
      ],
      attachmentType: [
        '',
        Validators.compose([Validators.required])
      ],
      doc_count: [
        'MULTIPLE',
        Validators.compose([Validators.required])
      ],
      photos: this.formBuilder.array([]),
      // Validators.compose([Validators.required]),
      'shouldMerge': new FormControl(false),
    });
  }

  // We will create multiple form controls inside defined form controls photos.
  createItem(data): FormGroup {
    return this.formBuilder.group(data);
  }

  //Help to get all photos controls as form array.
  get photos(): FormArray {
    return this.documentGrp.get('photos') as FormArray;
  }

  detectFiles(event) {
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.photos.push(this.createItem({
            file,
            url: event.target.result  //Base64 string for preview image
          }));
        }
        reader.readAsDataURL(file);
      }
    }
  }

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
    this.loading = true;
    this.mediaService.getFileMetaData(ids, this.tenantId).subscribe(data => {
      this.metaDataList = data.data || [];
      this.loading = false;
    });
  }

  public OnSubmit(formValue: any) {
    let obj = this.documentGrp.value;
    obj.file = obj.photos;
    delete obj['photos'];
    obj.tenantId = this.tenantId;
    this.loading = true;
    this.mediaService.uploadFiles(obj).subscribe(data => {
      if (data.status == 500 || (data.ok && data.ok === false)) {
        console.log("Have to handle");
        this.loading = false;
        this.updates.emit({
          status: 'UPLOAD_FAILURE',
          files: obj,
          attachmentIds: [],
          uploadStatus: true
        });
      }
      else {
        const arr = data[1].data || [];
        const attachmentIds = arr.map(obj => {
          return obj.id;
        });
        this.loading = false;
        this.updates.emit({
          status: 'UPLOAD_SUCCESSFULL',
          files: obj,
          attachmentIds: attachmentIds,
          uploadStatus: true
        });
      }
    });
  }

  downloadMediaFn(item) {
    this.mediaService.downloadFile(item.id, this.tenantId).subscribe(data => { });
  }

}
