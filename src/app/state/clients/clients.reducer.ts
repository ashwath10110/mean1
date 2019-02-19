import { ClientsActions, ClientsActionTypes } from "./clients.actions";
import { ClientsState } from "./clients.model";


export const initialState: ClientsState = {

    tenantsList: null,

    details: null,

    isLoaded: false,
    loading: false,
    error: null,
    message: '',
};

export function ClientsReducer(
    state: ClientsState = initialState,
    action: ClientsActions
): ClientsState {

    switch (action.type) {

        case ClientsActionTypes.GET_TENANTS:
            return {
                ...state,
                loading: true,
                isLoaded: false,
                tenantsList: []
            };

        case ClientsActionTypes.GET_TENANTS_SUCCESS: {
            let tenantsList = (action.payload.data || []);

            tenantsList = tenantsList.map(ele => {
                let isContractExpiring = false,
                    currentDate = new Date(),
                    contractEndDate = new Date(0 + ele.contractEndDate),
                    timeDiff = contractEndDate.getTime() - currentDate.getTime(),
                    diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                if (diffDays < 10) {
                    isContractExpiring = true;
                }
                return {
                    ...ele,
                    isContractExpiring: isContractExpiring,
                    expiresIn: diffDays
                }
            });
            return {
                ...state,
                loading: false,
                isLoaded: true,
                tenantsList: tenantsList
            };
        }

        case ClientsActionTypes.GET_TENANTS_ERROR:
            return {
                ...state,
                loading: false,
                isLoaded: true,
                error: action.payload.error
            };

        case ClientsActionTypes.DELETE_TENANT:
            return {
                ...state,
                loading: true,
            };

        case ClientsActionTypes.DELETE_TENANT_SUCCESS: {
            const tenantId = action.payload.tenants[1];
            const filteredList = state.tenantsList.filter(ele => {
                return tenantId != ele.id;
            });
            return {
                ...state,
                tenantsList: filteredList,
                loading: false
            };
        }

        case ClientsActionTypes.DELETE_TENANT_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        }

        case ClientsActionTypes.GET_TENANT_DETAILS: {
            return {
                ...state,
                loading: true
            };
        }

        case ClientsActionTypes.GET_TENANT_DETAILS_SUCCESS: {
            return {
                ...state,
                details: action.payload[0].data,
                loading: false
            };
        }

        case ClientsActionTypes.GET_TENANT_DETAILS_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }

}
