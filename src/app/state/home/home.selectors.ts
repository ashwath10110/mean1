import { createSelector } from '@ngrx/store';
import { selectHomeState, HomeState } from './home.state';

export const selectHome = createSelector(
  selectHomeState,
  (state: HomeState) => state.client
);
