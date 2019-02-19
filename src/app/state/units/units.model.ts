import { HttpErrorResponse } from '@angular/common/http';

export interface UnitsState {

  unitsList?: any[];
  orgData?: any[];

  loading: boolean;
  error?: HttpErrorResponse;
  message: string;
}

