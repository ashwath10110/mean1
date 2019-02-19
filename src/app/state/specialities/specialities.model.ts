import { HttpErrorResponse } from '@angular/common/http';

export interface SpecialitiesState {

  currentClientDepartments: any;
  currentUnitDepartments: any;
  
  masterSpecializations: any;
  unitSpecializations :any;
  specialities: any;
  
  loading: boolean;
  error?: HttpErrorResponse;
  message: string;
}

