import { HttpErrorResponse } from '@angular/common/http';

export interface PartnersState {

  partnersList?: any[];
  partnerData?: any[];
  partnerFinanceData?: any[];
  partnerContactData?: any[];
  partnerAddressData?: any[];
  currentContactData?: any;

  loading: boolean;
  error?: HttpErrorResponse;
  message: string;

}
