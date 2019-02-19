import { createSelector } from '@ngrx/store';
import { HomeState, selectHomeState } from '../home/home.state';

export const selectClients = createSelector(
  selectHomeState,
  (state: HomeState) => state.clients
);

export const selectAllTenants = createSelector(
  selectHomeState,
  (state: HomeState) => state.clients.tenantsList
);

export const selectClientsLoading = createSelector(
  selectHomeState,
  (state: HomeState) => state.clients.loading
);

export const selectClientsIsLoaded = createSelector(
  selectHomeState,
  (state: HomeState) => state.clients.isLoaded
);

