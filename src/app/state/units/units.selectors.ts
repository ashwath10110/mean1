import { createSelector } from '@ngrx/store';
import { selectHomeState, HomeState } from '../home/home.state';

export const selectUnits = createSelector(
  selectHomeState,
  (state: HomeState) => state.units
);
