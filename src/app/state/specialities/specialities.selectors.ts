import { createSelector } from '@ngrx/store';
import { HomeState, selectHomeState } from '../home/home.state';

export const selectSpecialities = createSelector(
  selectHomeState,
  (state: HomeState) => state.specialities
);
