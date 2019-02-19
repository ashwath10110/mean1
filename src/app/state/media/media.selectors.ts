import { createSelector } from '@ngrx/store';
import { selectHomeState, HomeState } from '../home/home.state';

export const selectMedia = createSelector(
  selectHomeState,
  (state: HomeState) => state.media
);
