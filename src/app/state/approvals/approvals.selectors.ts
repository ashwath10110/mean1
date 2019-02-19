import { createSelector } from '@ngrx/store';
import { HomeState, selectHomeState } from '../home/home.state';

export const selectApprovals = createSelector(
  selectHomeState,
  (state: HomeState) => state.approvals
);

export const selectApprovalsList = createSelector(
  selectHomeState,
  (state: HomeState) => state.approvals.approvalsList
);

export const selectApprovalsLoading = createSelector(
  selectHomeState,
  (state: HomeState) => state.approvals.loading
);
