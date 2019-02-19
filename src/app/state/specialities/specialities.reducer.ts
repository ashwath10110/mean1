
import { SpecialitiesActions, SpecialitiesActionTypes } from "./specialities.actions";
import { SpecialitiesState } from "./specialities.model";
import { dataForTree } from "@app/common/departments";

export const initialState: SpecialitiesState = {

    currentClientDepartments: [],
    currentUnitDepartments: [],

    specialities: [],
    masterSpecializations: [],
    unitSpecializations: [],

    loading: false,
    error: null,
    message: '',
};

export function specialitiesReducer(
    state: SpecialitiesState = initialState,
    action: SpecialitiesActions
): SpecialitiesState {

    switch (action.type) {

        case SpecialitiesActionTypes.DELETE_DEPARTMENT: {
            return {
                ...state,
                loading: true
            };
        }

        case SpecialitiesActionTypes.DELETE_DEPARTMENT_SUCCESS: {
            return {
                ...state,
                // currentClientDepartments: deps,
                loading: false
            };
        }

        case SpecialitiesActionTypes.DELETE_DEPARTMENT_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        case SpecialitiesActionTypes.GET_DEPARTMENTS: {
            return {
                ...state,
                loading: true
            };
        }

        case SpecialitiesActionTypes.GET_DEPARTMENTS_SUCCESS: {
            return {
                ...state,
                masterSpecializations: action.payload.data,
                loading: false
            };
        }

        case SpecialitiesActionTypes.GET_DEPARTMENTS_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        case SpecialitiesActionTypes.GET_DEPARTMENTS_BY_UNIT_ID: {
            return {
                ...state,
                loading: true
            };
        }

        case SpecialitiesActionTypes.GET_DEPARTMENTS_BY_UNIT_ID_SUCCESS: {
            return {
                ...state,
                currentClientDepartments: action.payload.data.specializations,
                loading: false
            };
        }

        case SpecialitiesActionTypes.GET_DEPARTMENTS_BY_UNIT_ID_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        case SpecialitiesActionTypes.ADD_SPECIALIZATIONS_TO_UNITS_SUCCESS: {
            return {
                ...state,
                loading: true
            };
        }

        case SpecialitiesActionTypes.ADD_SPECIALIZATIONS_TO_UNITS_SUCCESS: {
            return {
                ...state,
                currentClientDepartments: action.payload.data.specializations,
                loading: false
            };
        }

        case SpecialitiesActionTypes.ADD_SPECIALIZATIONS_TO_UNITS_SUCCESS: {
            return {
                ...state,
                loading: false
            };
        }

        case SpecialitiesActionTypes.GET_UNIT_SPECIALITY_DETAILS: {
            return {
                ...state
            };
        }

        case SpecialitiesActionTypes.GET_UNIT_SPECIALITY_DETAILS_SUCCESS: {
            let res = processSpecs(state.masterSpecializations, action.payload.data.specializations || [])
            return {
                ...state,
                currentClientDepartments: res.selectedDepts,
                currentUnitDepartments: res.selectedDepts,
                specialities: res.allDepts
            };
        }

        case SpecialitiesActionTypes.GET_UNIT_SPECIALITY_DETAILS_ERROR: {
            return {
                ...state
            };
        }

        case SpecialitiesActionTypes.APPROVE_UNIT_SPECIALITIES: {
            return {
                ...state
            };
        }

        case SpecialitiesActionTypes.APPROVE_UNIT_SPECIALITIES_SUCCESS: {
            let res = processSpecs(state.masterSpecializations, action.payload.data.specializations || [])
            return {
                ...state,
                currentClientDepartments: res.selectedDepts,
                currentUnitDepartments: res.selectedDepts,
                specialities: res.allDepts
            };
        }

        case SpecialitiesActionTypes.APPROVE_UNIT_SPECIALITIES_ERROR: {
            return {
                ...state
            };
        }

        case SpecialitiesActionTypes.UPDATE_UNIT_SPECIALITY_DETAILS: {
            return {
                ...state
            };
        }

        case SpecialitiesActionTypes.UPDATE_UNIT_SPECIALITY_DETAILS_SUCCESS: {
            return {
                ...state,
                // details: action.payload.data,
            };
        }

        case SpecialitiesActionTypes.UPDATE_UNIT_SPECIALITY_DETAILS_ERROR: {
            return {
                ...state
            };
        }

        case SpecialitiesActionTypes.GET_SPECIALITIES_CURRENT_CLIENT: {
            return {
                ...state
            };
        }

        case SpecialitiesActionTypes.GET_SPECIALITIES_CURRENT_CLIENT_SUCCESS: {
            let specialities = [];
            let results = [...action.payload.data];
            for (let i = 1; i < results.length; i++) {
                let resultData =[...results[i].data.specializations];
                if(resultData)
                for(let j=0;j<resultData.length;j++){
                     specialities.push(resultData[j]);
                }       
            }
            return {
                ...state,
                unitSpecializations: specialities,
            };
        }

        case SpecialitiesActionTypes.GET_SPECIALITIES_CURRENT_CLIENT_ERROR: {
            return {
                ...state
            };
        }

        default:
            return state;
    }

    function processSpecs(masterList, obj) {
        const specializations = obj || [];
        let allDepts = masterList || [];
        const selectedDepts = [];
        for (var i = 0; i < allDepts.length; i++) {
            for (var j = 0; j < specializations.length; j++) {
                if (allDepts[i].id === specializations[j].id) {
                    selectedDepts.push(allDepts[i]);
                }
            }
        }
        return {
            selectedDepts: selectedDepts,
            allDepts: allDepts
        };
    }

}