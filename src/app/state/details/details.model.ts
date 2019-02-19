import { HttpErrorResponse } from '@angular/common/http';

export interface DetailsState {

  finance: clientFinance;
  details: clientFinance;
  doctorsList?: any[];
  usersList?: any[];
  partnersList?: any[];

  loading: boolean;
  error?: HttpErrorResponse;
  message: string;
}

export interface clientFinance {
  bankingType?: string;
  accountType?: string;
  accountNo?: string;
  bankName?: string;
  branchName?: string;
  currency?: string;
  ifscCode?: string;
  ownerName?: string;
  swiftCode?: string;
  micr?: string;
  statusForUpdate: string;
  isLoaded: boolean;
  isInitialised: boolean;
  errorMessage: any;
}
