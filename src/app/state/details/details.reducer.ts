import { DetailsActions, DetailsActionTypes } from "./details.actions";
import { DetailsState } from "./details.model";

export const initialState: DetailsState = {

    finance: null,
    details: null,

    doctorsList: [],
    usersList: [],
    partnersList: [],

    loading: false,
    error: null,
    message: "",

};

export function detailsReducer(
    state: DetailsState = initialState,
    action: DetailsActions
): DetailsState {

    switch (action.type) {

        case DetailsActionTypes.RESET_UNIT_STATE: {
            return {
                ...state,
                finance: null,
                details: null,
                doctorsList: [],
                usersList: [],
                partnersList: [],
                loading: false,
                error: null,
                message: "",
            };
        }

        case DetailsActionTypes.GET_UNIT_DETAILS: {
            return {
                ...state
            };
        }

        case DetailsActionTypes.GET_UNIT_DETAILS_SUCCESS: {
            return {
                ...state,
                details: action.payload.data,
            };
        }

        case DetailsActionTypes.GET_UNIT_DETAILS_ERROR: {
            return {
                ...state
            };
        }

        case DetailsActionTypes.GET_UNIT_ADDRESS_DETAILS: {
            return {
                ...state
            };
        }

        case DetailsActionTypes.GET_UNIT_ADDRESS_DETAILS_SUCCESS: {
            return {
                ...state,
                details: action.payload.data,
            };
        }

        case DetailsActionTypes.GET_UNIT_ADDRESS_DETAILS_ERROR: {
            return {
                ...state
            };
        }

        case DetailsActionTypes.UPDATE_UNIT_ADDRESS_DETAILS: {
            return {
                ...state
            };
        }

        case DetailsActionTypes.UPDATE_UNIT_ADDRESS_DETAILS_SUCCESS: {
            return {
                ...state,
                details: action.payload.data,
            };
        }

        case DetailsActionTypes.UPDATE_UNIT_ADDRESS_DETAILS_ERROR: {
            return {
                ...state
            };
        }

        case DetailsActionTypes.UPDATE_UNIT_DETAILS: {
            return {
                ...state
            };
        }

        case DetailsActionTypes.UPDATE_UNIT_DETAILS_SUCCESS: {
            return {
                ...state,
                details: action.payload.data,
            };
        }

        case DetailsActionTypes.UPDATE_UNIT_DETAILS_ERROR: {
            return {
                ...state
            };
        }

        case DetailsActionTypes.GET_UNIT_FINANCE: {
            return {
                ...state
            };
        }

        case DetailsActionTypes.GET_UNIT_FINANCE_SUCCESS: {
            return {
                ...state,
                finance: action.payload.data,
            };
        }

        case DetailsActionTypes.GET_UNIT_FINANCE_ERROR: {
            return {
                ...state
            };
        }

        case DetailsActionTypes.UPDATE_UNIT_FINANCE: {
            return {
                ...state
            };
        }

        case DetailsActionTypes.UPDATE_UNIT_FINANCE_SUCCESS: {
            return {
                ...state,
                finance: action.payload.data,
            };
        }

        case DetailsActionTypes.UPDATE_UNIT_FINANCE_ERROR: {
            return {
                ...state
            };
        }
        case DetailsActionTypes.DELETE_UNIT_CONTACT_DETAILS: {

            return{
                ...state,
                loading: true
            }
        }
        case DetailsActionTypes.DELETE_UNIT_CONTACT_DETAILS_SUCCESS: {
            return{
                ...state,
                loading: false,
                details: action.payload.data
            }
        }
        case DetailsActionTypes.DELETE_UNIT_CONTACT_DETAILS_ERROR: {

            return{
                ...state,
                loading: false
            }
        }

        default:
            return state;
    }

}
