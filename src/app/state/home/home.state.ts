import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import { homeReducer } from './home.reducer';
import { clientOnboardingReducer } from '../client-onboarding/client-onboarding.reducer';

import { ClientsReducer } from '../clients/clients.reducer';
import { doctorsReducer } from '../doctors/doctors.reducer';
import { partnersReducer } from '../partners/partners.reducer';
// import { locationsReducer } from '../locations/locations.reducer';
import { specialitiesReducer } from '../specialities/specialities.reducer';
import { unitsReducer } from '../units/units.reducer';
import { usersReducer } from '../users/users.reducer';
import { UsersState } from '../users/users.model';
import { ClientsState } from '../clients/clients.model';
import { DoctorsState } from '../doctors/doctors.model';
import { PartnersState } from '../partners/partners.model';
import { LocationsState } from '../locations/locations.model';
import { SpecialitiesState } from '../specialities/specialities.model';
import { UnitsState } from '../units/units.model';

import { ClientOnboardingState } from '../client-onboarding/client-onboarding.model';
import { AppState } from '@app/core';
import { DetailsState } from '../details/details.model';
import { detailsReducer } from '../details/details.reducer';
import { mediaReducer } from '@app/state/media/media.reducer';
import { MediaState } from '@app/state/media/media.model';
import { locationsReducer } from '@app/state/locations/locations.reducer';
import { ApprovalsReducer } from '@app/state/approvals/approvals.reducer';
import { ApprovalsState } from '@app/state/approvals/approvals.model';

export const FEATURE_NAME = 'home';

export const selectHomeState = createFeatureSelector<State, HomeState>(
  FEATURE_NAME
);

export const reducers: ActionReducerMap<HomeState> = {
  client: ClientsReducer,
  details: detailsReducer,
  users: usersReducer,
  clientOnboarding: clientOnboardingReducer,
  clients: ClientsReducer,
  doctors: doctorsReducer,
  partners: partnersReducer,
  locations: locationsReducer,
  specialities: specialitiesReducer,
  units: unitsReducer,
  media: mediaReducer,
  approvals: ApprovalsReducer
};

export interface HomeState {
  client: ClientsState;
  details: DetailsState;
  users: UsersState;
  clientOnboarding: ClientOnboardingState;
  clients: ClientsState;
  doctors: DoctorsState;
  partners: PartnersState;
  locations: LocationsState;
  specialities: SpecialitiesState;
  units: UnitsState;
  media: MediaState;
  approvals: ApprovalsState;
}

export interface State extends AppState {
  home: HomeState;
}
