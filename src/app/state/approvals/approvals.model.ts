import { HttpErrorResponse } from '@angular/common/http';

export interface Tenant {
  id: string;
  name: string;
  description: string;
  tenantType: string;
  ownerEmail: string;
  ownerName: string;
  details: any;
  active: boolean;
}

export interface ApprovalsState {

  approvalsList?: any;
  rejectApprovals?: any;
  currentApproval?: any;
  currentApprovedData?: any;

  loading: boolean;
  isLoaded: boolean;

  error?: HttpErrorResponse;
  message: string;
}

