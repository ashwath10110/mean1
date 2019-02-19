import { HttpErrorResponse } from '@angular/common/http';

export interface UsersState {

  usersList?: any[];
  currentUnitUsers: any;
	unitMappingUsers?:any;
  approveUsersData: any;

  loading: boolean;
  error?: HttpErrorResponse;

  message: string;
}

