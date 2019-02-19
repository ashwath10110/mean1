import * as arrayToTree from 'array-to-tree';

import { UnitsActionTypes, UnitsActions } from './units.actions';
import { UnitsState } from './units.model';

export const initialState: UnitsState = {
    unitsList: [],
    orgData: [],
    loading: false,
    error: null,
    message: '',
};

export function unitsReducer(
    state: UnitsState = initialState,
    action: UnitsActions
): UnitsState {

    switch (action.type) {

        case UnitsActionTypes.DELETE_TENANT_UNIT:
            return {
                ...state,
                loading: true,
            };

        case UnitsActionTypes.DELETE_TENANT_UNIT_SUCCESS: {
            const filteredUnits = state.unitsList.filter(ele => {
                return action.payload.data[1] != ele.id;
              });
              return {
                ...state,
                unitsList: filteredUnits,
                loading: false
              };
        }

        case UnitsActionTypes.DELETE_TENANT_UNIT_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        }


        case UnitsActionTypes.GET_TENANT_UNITS: {
            return {
                ...state,
                loading: true
            };
        }

        case UnitsActionTypes.GET_TENANT_UNITS_SUCCESS: {
            const unitsList = action.payload[0].data;
            const newData = [];
            unitsList.forEach(ele => {
                newData.push({
                    ...ele,
                    title: ele.name || "",
                    name: ele.name || "",
                    expanded: true,
                    id: ele.id
                });
            });
            const dataForOrgTree = arrayToTree(newData, {
                parentProperty: 'parentId',
                customID: 'id'
            });
            return {
                ...state,
                unitsList: unitsList,
                orgData: dataForOrgTree,
                loading: false
            };
        }

        case UnitsActionTypes.GET_TENANT_UNITS_ERROR: {
            return {
                ...state,
                loading: false
            };
        }



        case UnitsActionTypes.CREATE_TENANT_UNIT: {
            return {
                ...state,
                loading: true
            };
        }

        case UnitsActionTypes.CREATE_TENANT_UNIT_SUCCESS: {
            return {
                ...state,
                loading: false
            };
        }

        case UnitsActionTypes.CREATE_TENANT_UNIT_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
