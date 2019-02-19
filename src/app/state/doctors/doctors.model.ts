import { HttpErrorResponse } from '@angular/common/http';

export interface DoctorsState {
  doctorsList?: any[];
  currentClientDoctors: any;
  loading: boolean;
  error?: HttpErrorResponse;
  message: string;
}

