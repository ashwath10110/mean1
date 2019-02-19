import { ClientOnBoardingActions, ClientOnboardingActionTypes } from "./client-onboarding.actions";
import { baseFinance, baseContract, baseHosting } from "../base-state.model";
import { ClientOnboardingState } from "./client-onboarding.model";

export const initialState: ClientOnboardingState = {

    clientData: null,
    contract: baseContract,
    finance: baseFinance,
    contacts: null,
    hosting: baseHosting,
    info: null,

    loading: false,
    isLoaded: false,
    errorMessage: null

};

export function clientOnboardingReducer(
    state: ClientOnboardingState = initialState,
    action: ClientOnBoardingActions
): ClientOnboardingState {

    switch (action.type) {

        case ClientOnboardingActionTypes.GET_CLIENT_FINANCE_DATA: {
            return {
                ...state,
                loading: true
            };
        }

        case ClientOnboardingActionTypes.GET_CLIENT_FINANCE_DATA_SUCCESS: {
            return {
                ...state,
                finance: action.payload.data,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.GET_CLIENT_FINANCE_DATA_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.GET_CLIENT_CONTRACT_DATA: {
            return {
                ...state,
                loading: true
            };
        }

        case ClientOnboardingActionTypes.GET_CLIENT_CONTRACT_DATA_SUCCESS: {
            return {
                ...state,
                contract: action.payload.data,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.GET_CLIENT_CONTRACT_DATA_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

         case ClientOnboardingActionTypes.GET_CLIENT_DETAILS: {
            return {
                ...state,
                loading: true
            };
        }

        case ClientOnboardingActionTypes.GET_CLIENT_DETAILS_SUCCESS: {
            return {
                ...state,
                contract: action.payload.data,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.GET_CLIENT_DETAILS_ERROR: {
            return {
                ...state,
                loading: false
            };
        }
        
        case ClientOnboardingActionTypes.UPDATE_CLIENT_ADMIN_ACCOUNTS_DATA: {
            return {
                ...state,
                loading: true
            };
        }
        
        
        case ClientOnboardingActionTypes.UPDATE_CLIENT_ADMIN_ACCOUNTS_DATA_SUCCESS: {
            return {
                ...state,
                clientData: action.payload.data,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.UPDATE_CLIENT_ADMIN_ACCOUNTS_DATA_ERROR: {
            return {
                ...state,
                loading: false
            };
        }
        
        case ClientOnboardingActionTypes.GET_CLIENT_ADMIN_ACCOUNTS_DATA: {
            return {
                ...state,
                loading: true
            };
        }
        
        case ClientOnboardingActionTypes.GET_CLIENT_ADMIN_ACCOUNTS_DATA_SUCCESS: {
            return {
                ...state,
                clientData: action.payload.data,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.GET_CLIENT_ADMIN_ACCOUNTS_DATA_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.UPDATE_CLIENT_FINANCE_DATA: {
            return {
                ...state,
                loading: true
            };
        }

        case ClientOnboardingActionTypes.UPDATE_CLIENT_FINANCE_DATA_SUCCESS: {
            return {
                ...state,
                finance: action.payload.data,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.UPDATE_CLIENT_FINANCE_DATA_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.UPDATE_CLIENT_CONTRACT_DATA: {
            return {
                ...state,
                loading: true
            };
        }

        case ClientOnboardingActionTypes.UPDATE_CLIENT_CONTRACT_DATA_SUCCESS: {
            return {
                ...state,
                contract: action.payload.data,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.UPDATE_CLIENT_CONTRACT_DATA_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.UPDATE_CLIENT_INFO_DATA: {
            return {
                ...state,
                loading: true
            };
        }

        case ClientOnboardingActionTypes.UPDATE_CLIENT_INFO_DATA_SUCCESS: {
            return {
                ...state,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.UPDATE_CLIENT_INFO_DATA_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.UPDATE_CLIENT_DATA: {
            return {
                ...state,
                loading: true
            };
        }

        case ClientOnboardingActionTypes.UPDATE_CLIENT_DATA_SUCCESS: {
            return {
                ...state,
                clientData: action.payload.data,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.UPDATE_CLIENT_DATA_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.GET_CLIENT_CONTACT_DETAILS: {
            return {
                ...state,
                loading: true
            };
        }

        case ClientOnboardingActionTypes.GET_CLIENT_CONTACT_DETAILS_SUCCESS: {
            return {
                ...state,
                contacts: action.payload.data,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.GET_CLIENT_CONTACT_DETAILS_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.UPDATE_CLIENT_CONTACT_DETAILS: {
            return {
                ...state,
                loading: true
            };
        }

        case ClientOnboardingActionTypes.UPDATE_CLIENT_CONTACT_DETAILS_SUCCESS: {
            return {
                ...state,
                contacts: action.payload.data,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.UPDATE_CLIENT_CONTACT_DETAILS_ERROR: {
            return {
                ...state,
                loading: false
            };
        }
        case ClientOnboardingActionTypes.DELETE_CLIENT_CONTACT_DETAILS: {
            return {
                ...state,
                loading: true
            };
        }

        case ClientOnboardingActionTypes.DELETE_CLIENT_CONTACT_DETAILS_SUCCESS: {
            console.log(action.payload);
            return {
                ...state,
                contacts: action.payload.data,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.DELETE_CLIENT_CONTACT_DETAILS_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.GET_ADMIN_USER: {
            return {
                ...state,
                loading: true
            };
        }

        case ClientOnboardingActionTypes.GET_ADMIN_USER_SUCCESS: {
            return {
                ...state,
                clientData: action.payload.data,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.GET_ADMIN_USER_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.CREATE_ADMIN_USER: {
            return {
                ...state,
                loading: true
            };
        }

        case ClientOnboardingActionTypes.CREATE_ADMIN_USER_SUCCESS: {
            return {
                ...state,
                finance: action.payload.data,
                loading: false
            };
        }

        case ClientOnboardingActionTypes.CREATE_ADMIN_USER_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }

}
