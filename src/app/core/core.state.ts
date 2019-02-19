import { ActionReducerMap, MetaReducer, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth/auth.models';
import { authReducer } from './auth/auth.reducer';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
};

export const metaReducers: MetaReducer<AppState>[] = [];

export const selectAuthState = createFeatureSelector<AppState, AuthState>(
  'auth'
);

export interface AppState {
  auth: AuthState;
}
