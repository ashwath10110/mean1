import { HttpErrorResponse } from '@angular/common/http';

export interface UiState {
  
  details: any[],
  loading: boolean;
  error?: HttpErrorResponse;

  message: string;
}
