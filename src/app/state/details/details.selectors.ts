import { createSelector } from '@ngrx/store';
import { HomeState, selectHomeState } from '../home/home.state';

export const selectDetails = createSelector(
  selectHomeState,
  (state: HomeState) => state.details
);
