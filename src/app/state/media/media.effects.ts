import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as MediaActions from './media.actions';

import { MediaActionTypes } from './media.actions';
import { MediaService } from './media.service';
import { AppService } from '@app/app/app.service';


@Injectable()
export class MediaEffects {

  constructor(
    private actions$: Actions < Action > ,
    private service: MediaService,
    private appService: AppService
  ) {}

  @Effect()
  createTenantUnit = this.actions$.pipe(
    ofType < MediaActions.ActionGetMedia > (MediaActionTypes.GET_MEDIA),
    switchMap((action: MediaActions.ActionGetMedia) =>
      this.service
      .getUnitMedia(action.payload)
      .pipe(
        map(res => new MediaActions.ActionGetMediaSuccess(res)),
        catchError(error => {
          this.handleError(error);
          return of(new MediaActions.ActionGetMediaError({ error }))
        })
      )
    )
  );

  @Effect()
  uploadMedia = this.actions$.pipe(
    ofType < MediaActions.ActionUploadMedia > (MediaActionTypes.UPLOAD_MEDIA),
    switchMap((action: MediaActions.ActionUploadMedia) =>
      this.service
      .uploadUnitMedia(action.payload)
      .pipe(
        map(res => new MediaActions.ActionUploadMediaSuccess(res)),
        catchError(error => {
          this.handleError(error);
          return of(new MediaActions.ActionUploadMediaError({ error }))
        })
      )
    )
  );

  @Effect()
  approveUploadMedia = this.actions$.pipe(
    ofType < MediaActions.ActionApproveUploadMedia > (MediaActionTypes.APPROVE_UPLOAD_MEDIA),
    switchMap((action: MediaActions.ActionApproveUploadMedia) =>
    this.service
    .approveUploadUnitMedia(action.payload)
    .pipe(
      map(res => new MediaActions.ActionApproveUploadMediaSuccess(res)),
      catchError(error => {
        this.handleError(error);
        return of(new MediaActions.ActionApproveUploadMediaError({ error }))
      })
    )
  )
);

  handleError(error) {
    this.appService.logError(error, true);
  }

}
