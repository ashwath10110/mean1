import { createSelector } from '@ngrx/store';
import { HomeState, selectHomeState } from '../home/home.state';

export const selectDoctors = createSelector(
  selectHomeState,
  (state: HomeState) => state.doctors
);
