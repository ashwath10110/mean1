import { PartnersState } from "./partners.model";
import { PartnersActionTypes, PartnersActions } from "./partners.actions";


export const initialState: PartnersState = {
    partnersList: [],
    partnerData: [],
    partnerFinanceData: [],
    partnerContactData: [],
    partnerAddressData:[],
    currentContactData: [],
   // partnersContactPersonsList: [],
    loading: false,
    error: null,
    message: '',
};

const partnerMockData = [{
    id: "da012679-38e7-4305-ae09-20b01b826d38",
    description: "TEST Partner",
    email: "rakesh@medblaze.com",
    init: true,
    isActive: true,
    mobile: 9999999999,
    tenantType: 'Associate',
    cin: '122345',
    pan: 'SDGYDD1234'
}];

export function partnersReducer(
    state: PartnersState = initialState,
    action: PartnersActions
): PartnersState {

    switch (action.type) {

        case PartnersActionTypes.GET_PARTNERS:
            return {
                ...state,
                loading: true
            };

        case PartnersActionTypes.GET_PARTNERS_SUCCESS: {
            console.log(action.payload);
            const partnersData = action.payload.data.data;
            console.log(partnersData, 'partnersData');
            return {
                ...state,
                loading: false,
                partnersList: partnersData
                // partnersList: processedUsersAll
            };
        }

        case PartnersActionTypes.GET_PARTNERS_ERROR: {
            return {
                ...state,
                loading: false,
            };
        }

        case PartnersActionTypes.CREATE_PARTNER: {
            return {
                ...state,
                loading: true,
            };
        }

        case PartnersActionTypes.CREATE_PARTNER_SUCCESS: {
            return {
                ...state,
               // partnersList: [action.payload.tenants, ...state.partnersList],
                loading: false
            };
        }

        case PartnersActionTypes.CREATE_PARTNER_ERROR: {
            return {
                ...state,
                loading: false
            };
        }
        case PartnersActionTypes.DELETE_PARTNER: {
            return {
                ...state,
                loading: true,
            };
        }

        case PartnersActionTypes.DELETE_PARTNER_SUCCESS: {
            const partnerArray = state.partnersList;
            const id = action.payload[1];
            const finalArray = partnerArray.filter((data) => { return data.id !== id; });
            return {
                ...state,
                partnersList: finalArray,
                loading: false
            };
        }

        case PartnersActionTypes.DELETE_PARTNER_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        case PartnersActionTypes.GET_PARTNER_DETAILS: {
            console.log(action.payload);
            return {
                ...state,
                loading: true,

            };
        }

        case PartnersActionTypes.GET_PARTNER_SUCCESS: {
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                partnerData: action.payload[0].data
            };
        }

        case PartnersActionTypes.GET_PARTNER_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload.data
            };
        }


        case PartnersActionTypes.GET_PARTNER_FINANCE_DATA: {
            return {
                ...state,
                loading: true
            };
        }

        case PartnersActionTypes.GET_PARTNER_FINANCE_DATA_SUCCESS: {
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                partnerFinanceData: action.payload[0].data
            };
        }

        case PartnersActionTypes.GET_PARTNER_FINANCE_DATA_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload[0].data,
                //  partnerFinanceData: {}
            };
        }


        case PartnersActionTypes.UPDATE_PARTNER_FINANCE: {
            return {
                ...state,
                loading: true
            };
        }

        case PartnersActionTypes.UPDATE_PARTNER_FINANCE_SUCCESS: {
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                partnerFinanceData: action.payload.data
            };
        }

        case PartnersActionTypes.UPDATE_PARTNER_FINANCE_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload.data
            };
        }
        case PartnersActionTypes.UPDATE_PARTNER_CONTACT: {
            return {
                ...state,
                loading: true
            };
        }

        case PartnersActionTypes.UPDATE_PARTNER_CONTACT_SUCCESS: {
            console.log(action);
            const contactsArray = state.partnerContactData;
          //  contactsArray.push(action.payload.data);
            return {
                ...state,
                loading: false,
                currentContactData: action.payload.data,
                partnerContactData: contactsArray
            };
        }

        case PartnersActionTypes.UPDATE_PARTNER_CONTACT_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload.data
            };
        }
        case PartnersActionTypes.GET_PARTNER_CONTACT: {
            return {
                ...state,
                loading: true
            };
        }

        case PartnersActionTypes.GET_PARTNER_CONTACT_SUCCESS: {
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                partnerContactData: action.payload.data
            };
        }

        case PartnersActionTypes.GET_PARTNER_CONTACT_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload.data
            };
        }
        case PartnersActionTypes.GET_PARTNER_ADDRESS: {
            return {
                ...state,
                loading: true
            };
        }
        case PartnersActionTypes.GET_PARTNER_ADDRESS_SUCCESS: {
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                partnerAddressData: action.payload[0].data
            };
        }

        case PartnersActionTypes.GET_PARTNER_ADDRESS_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload.data
            };
        }

        case PartnersActionTypes.UPDATE_PARTNER_ADDRESS: {
            return {
                ...state,
                loading: true
            };
        }

        case PartnersActionTypes.UPDATE_PARTNER_ADDRESS_SUCCESS: {
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                partnerAddressData: action.payload.data
            };
        }

        case PartnersActionTypes.UPDATE_PARTNER_ADDRESS_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload.data
            };
        }



        default:
            return state;
    }
}
