import { createSelector } from '@ngrx/store';
import { HomeState, selectHomeState } from '../home/home.state';

export const selectPartners = createSelector(
  selectHomeState,
  (state: HomeState) => state.partners
);
