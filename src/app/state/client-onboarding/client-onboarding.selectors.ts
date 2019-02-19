import { createSelector } from '@ngrx/store';
import { HomeState, selectHomeState } from '../home/home.state';

export const selectClientOnboarding = createSelector(
  selectHomeState,
  (state: HomeState) => state.clientOnboarding
);
