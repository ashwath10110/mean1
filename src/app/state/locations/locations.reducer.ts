import { LocationsActionTypes, LocationsActions } from "./locations.actions";
import { LocationsState } from "./locations.model";

export const initialState: LocationsState = {
  countryList: [],
  stateList: [],
  cityList: [],
  selectedLocationIdDetails: [],
  loading: false,
  isLoaded: false,
  error: null,
  message: '',
};

export function locationsReducer(
  state: LocationsState = initialState,
  action: LocationsActions
): LocationsState {

  switch (action.type) {

    case LocationsActionTypes.GET_COUNTRY_STATE_CITY:
      {
        return {
          ...state,
          loading: true,
          isLoaded: false
        };
      }

    case LocationsActionTypes.GET_COUNTRY_STATE_CITY_SUCCESS:
      {
        return {
          ...state,
          countryList: action.payload.data[0].data,
          stateList: action.payload.data[1].data,
          cityList: action.payload.data[2].data,
          loading: false,
          isLoaded: true
        };
      }

    case LocationsActionTypes.GET_COUNTRY_STATE_CITY_ERROR:
      {
        return {
          ...state,
          loading: false,
          isLoaded: false
        };
      }

    case LocationsActionTypes.GET_COUNTRY:
      {
        return {
          ...state,
          loading: true
        };
      }

    case LocationsActionTypes.GET_COUNTRY_SUCCESS:
      {
        return {
          ...state,
          countryList: action.payload.data,
          loading: false
        };
      }

    case LocationsActionTypes.GET_COUNTRY_ERROR:
      {
        return {
          ...state,
          loading: false
        };
      }

    case LocationsActionTypes.GET_STATE_BY_COUNTRY_ID:
      {
        return {
          ...state,
          loading: true
        };
      }

    case LocationsActionTypes.GET_STATE_BY_COUNTRY_ID_SUCCESS:
      {
        return {
          ...state,
          stateList: action.payload.data,
          loading: false
        };
      }

    case LocationsActionTypes.GET_STATE_BY_COUNTRY_ID_ERROR:
      {
        return {
          ...state,
          loading: false
        };
      }

    case LocationsActionTypes.GET_CITY_BY_STATE_ID:
      {
        return {
          ...state,
          loading: true
        };
      }

    case LocationsActionTypes.GET_CITY_BY_STATE_ID_SUCCESS:
      {
        return {
          ...state,
          cityList: action.payload.data,
          loading: false
        };
      }

    case LocationsActionTypes.GET_CITY_BY_STATE_ID_ERROR:
      {
        return {
          ...state,
          loading: false
        };
      }

    case LocationsActionTypes.GET_COUNTRY_ID_STATE_ID_BY_CITY_ID:
      {
        return {
          ...state,
          loading: true
        };
      }

    case LocationsActionTypes.GET_COUNTRY_ID_STATE_ID_BY_CITY_ID_SUCCESS:
      {
        return {
          ...state,
          selectedLocationIdDetails: action.payload.data,
          loading: false
        };
      }

    case LocationsActionTypes.GET_COUNTRY_ID_STATE_ID_BY_CITY_ID_ERROR:
      {
        return {
          ...state,
          loading: false
        };
      }

    case LocationsActionTypes.CLEAR_ADDRESS_STATE:
      {
        return {
          ...state,
          stateList: [],
          cityList: [],
          selectedLocationIdDetails: [],
        };
      }

    default:
      return state;
  }


}
