import { createSelector } from '@ngrx/store';
import { HomeState, selectHomeState } from '../home/home.state';

export const selectUsers = createSelector(
  selectHomeState,
  (state: HomeState) => state.users
);
