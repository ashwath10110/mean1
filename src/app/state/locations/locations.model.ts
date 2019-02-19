import { HttpErrorResponse } from '@angular/common/http';

export interface LocationsState {
  countryList?: any[];
  stateList?: any[];
  cityList?: any[];
  selectedLocationIdDetails?: any[];
  loading: boolean;
  isLoaded: boolean;
  error?: HttpErrorResponse;
  message: string;
}

