import { createSelector } from '@ngrx/store';
import { HomeState, selectHomeState } from '../home/home.state';

export const selectLocations = createSelector(
  selectHomeState,
  (state: HomeState) => state.locations
);
