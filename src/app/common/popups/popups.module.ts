import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatIconModule, MatDividerModule, MatButtonModule } from '@angular/material';
import { ConfirmComponent } from '@app/common/popups/confirm/confirm.component';
import { AlertComponent } from '@app/common/popups/alert/alert.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
  ],
  declarations: [AlertComponent, ConfirmComponent],
  exports: [AlertComponent, ConfirmComponent],
  entryComponents: [AlertComponent, ConfirmComponent]
})
export class PopupModule { }
