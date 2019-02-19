import { ApprovalsState } from "@app/state/approvals/approvals.model";
import { ApprovalsActions, ApprovalsActionTypes } from "@app/state/approvals/approvals.actions";


export const initialState: ApprovalsState = {

    approvalsList: [],
    currentApproval: null,
    currentApprovedData: null,

    rejectApprovals:[],

    isLoaded: false,
    loading: false,
    error: null,
    message: '',
};

export function ApprovalsReducer(
    state: ApprovalsState = initialState,
    action: ApprovalsActions
): ApprovalsState {

    switch (action.type) {

        case ApprovalsActionTypes.GET_APPROVALS: {
            return {
                ...state,
                loading: true
            };
        }

        case ApprovalsActionTypes.GET_APPROVALS_SUCCESS: {
            return {
                ...state,
                approvalsList: action.payload.data,
                loading: false
            };
        }

        case ApprovalsActionTypes.GET_APPROVALS_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        case ApprovalsActionTypes.REJECT_APPROVAL: {
            return {
                ...state,
                loading: true
            };
        }

        case ApprovalsActionTypes.REJECT_APPROVAL_SUCCESS: {
            return {
                ...state,
                rejectApprovals: action.payload.data,
                loading: false
            };
        }

        case ApprovalsActionTypes.REJECT_APPROVAL_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        case ApprovalsActionTypes.SET_CURRENT_APPROVAL: {
            return {
                ...state,
                currentApproval: action.payload.approval
            };
        }

        case ApprovalsActionTypes.SET_CURRENT_APPROVED_GET_DATA: {
            return {
                ...state,
                currentApprovedData: action.payload.data
            };
        }

        default:
            return state;
    }

}
