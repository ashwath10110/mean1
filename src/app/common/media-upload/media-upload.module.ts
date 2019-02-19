import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaContainerComponent } from './media-container/media-container.component';
import { MediaListComponent } from '@app/common/media-upload/media-list/media-list.component';
import { EditMediaItemComponent } from '@app/common/media-upload/edit-media-item/edit-media-item.component';
import { MultifileuploadComponent } from '@app/common/media-upload/multifileupload/multifileupload.component';
import { AllMaterialModule } from '@app/common/shared/all-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/common/shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AllMaterialModule,
    SharedModule
  ],
  declarations: [
    MediaContainerComponent,
    MediaListComponent,
    EditMediaItemComponent,
    MultifileuploadComponent
  ],
  exports:[
    MediaContainerComponent,
    MediaListComponent,
    EditMediaItemComponent,
    MultifileuploadComponent
  ],
  entryComponents: [
    EditMediaItemComponent
  ]
})
export class MediaUploadModule { }
