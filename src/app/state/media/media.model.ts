import { HttpErrorResponse } from '@angular/common/http';

export interface MediaState {

  mediaList?: any[];

  loading: boolean;
  error?: HttpErrorResponse;
  message: string;
}

