import { Action } from '@ngrx/store';

export enum MediaActionTypes {

  GET_MEDIA = '[units] GET_MEDIA',
  GET_MEDIA_SUCCESS = '[units] GET_MEDIA_SUCCESS',
  GET_MEDIA_ERROR = '[units] GET_MEDIA_ERROR',

  UPLOAD_MEDIA = '[units] UPLOAD_MEDIA',
  UPLOAD_MEDIA_SUCCESS = '[units] UPLOAD_MEDIA_SUCCESS',
  UPLOAD_MEDIA_ERROR = '[units] UPLOAD_MEDIA_ERROR',

  APPROVE_UPLOAD_MEDIA = '[units] APPROVE_UPLOAD_MEDIA',
  APPROVE_UPLOAD_MEDIA_SUCCESS = '[units] APPROVE_UPLOAD_MEDIA_SUCCESS',
  APPROVE_UPLOAD_MEDIA_ERROR = '[units] APPROVE_UPLOAD_MEDIA_ERROR',
}

export class ActionGetMedia implements Action {
  readonly type = MediaActionTypes.GET_MEDIA;
  constructor(readonly payload: any) { }
}

export class ActionGetMediaSuccess implements Action {
  readonly type = MediaActionTypes.GET_MEDIA_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionGetMediaError implements Action {
  readonly type = MediaActionTypes.GET_MEDIA_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionUploadMedia implements Action {
  readonly type = MediaActionTypes.UPLOAD_MEDIA;
  constructor(readonly payload: any) { }
}

export class ActionUploadMediaSuccess implements Action {
  readonly type = MediaActionTypes.UPLOAD_MEDIA_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionUploadMediaError implements Action {
  readonly type = MediaActionTypes.UPLOAD_MEDIA_ERROR;
  constructor(readonly payload: any) { }
}

export class ActionApproveUploadMedia implements Action {
  readonly type = MediaActionTypes.APPROVE_UPLOAD_MEDIA;
  constructor(readonly payload: any) { }
}

export class ActionApproveUploadMediaSuccess implements Action {
  readonly type = MediaActionTypes.APPROVE_UPLOAD_MEDIA_SUCCESS;
  constructor(readonly payload: any) { }
}

export class ActionApproveUploadMediaError implements Action {
  readonly type = MediaActionTypes.APPROVE_UPLOAD_MEDIA_ERROR;
  constructor(readonly payload: any) { }
}

export type MediaActions =

  | ActionGetMedia
  | ActionGetMediaSuccess
  | ActionGetMediaError

  | ActionUploadMedia
  | ActionUploadMediaSuccess
  | ActionUploadMediaError

  | ActionApproveUploadMedia
  | ActionApproveUploadMediaSuccess
  | ActionApproveUploadMediaError

  ;
