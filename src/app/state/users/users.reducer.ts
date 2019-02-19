import { UsersActions, UsersActionTypes } from "./users.actions";
import { UsersState } from "./users.model";

export const initialState: UsersState = {

    usersList: [],
    currentUnitUsers: [],
    unitMappingUsers : [],
    approveUsersData: {},

    loading: false,
    error: null,
    message: '',
};

export function usersReducer(
    state: UsersState = initialState,
    action: UsersActions
): UsersState {

    switch (action.type) {

        case UsersActionTypes.GET_USERS:
            return {
                ...state,
                loading: true,
                usersList: []
            };

        case UsersActionTypes.GET_USERS_SUCCESS: {
            
            const users = action.payload.data.data;
                return {
                ...state,
                loading: false,
                usersList: users
            };
        }

        case UsersActionTypes.GET_USERS_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        case UsersActionTypes.GET_USERS_BY_UNIT_ID:
            return {
                ...state,
                loading: true,
                currentUnitUsers: []
            };

        case UsersActionTypes.GET_USERS_BY_UNIT_ID_SUCCESS: {
            const currentUnitUsers = action.payload.data;
            return {
                ...state,
                loading: false,
                currentUnitUsers: currentUnitUsers
            };
        }

        case UsersActionTypes.GET_USERS_BY_UNIT_ID_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

         case UsersActionTypes.GET_USERS_UNIT_MAPPING:
            return {
                ...state,
                loading: true,
                currentUnitUsers: []
            };

        case UsersActionTypes.GET_USERS_UNIT_MAPPING_SUCCESS: {
            let userDetails = action.payload.data[0];
            let mappingDetails = action.payload.data[1];
            let resultArray = [];
            userDetails.data.forEach((userResult) => {
               mappingDetails.data.forEach((mappingResult) => {
                    if(userResult.id == mappingResult.userId){
                        userResult["roles"] = mappingResult.roles;
                        userResult["userId"] = mappingResult.userId;
                        userResult["unitId"] = mappingResult.unitId;
                        resultArray.push(userResult)
                    } 
                }); 
            });
            const currentUnitUsers = resultArray;
            return {
                ...state,
                loading: false,
                unitMappingUsers: currentUnitUsers
            };
        }

        case UsersActionTypes.GET_USERS_UNIT_MAPPING_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        case UsersActionTypes.UPDATE_USER: {
            return {
                ...state,
                loading: true
            };
        }

        case UsersActionTypes.UPDATE_USER_SUCCESS: {
            const newUser = action.payload.data;
            return {
                ...state,
                usersList: [...state.usersList, newUser],
                loading: false
            };
        }

        case UsersActionTypes.UPDATE_USER_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        case UsersActionTypes.APPROVE_USERS: {
            const approveUsersData = {
                tenantId: action.payload.tenantId,
                unitId: action.payload.unitId,
                userId: action.payload.userId
            };
            return {
                ...state,
                approveUsersData: approveUsersData
            };
        }

        case UsersActionTypes.DELETE_USER: {
            return {
                ...state,
                loading: false
            };
        }

        case UsersActionTypes.DELETE_USER_SUCCESS: {
            return {
                ...state,
                loading: false
            };
        }

        case UsersActionTypes.DELETE_USER_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        case UsersActionTypes.DELETE_UNIT_USER_MAPPING: {
            return {
                ...state,
                loading: false
            };
        }
        
        case UsersActionTypes.DELETE_UNIT_USER_MAP_SUCCESS: {
            const filteredUsers = state.unitMappingUsers.filter(ele => {
            return action.payload.data[1] != ele.id;
            });
            return {
            ...state,
            unitMappingUsers: filteredUsers,
            currentUnitUsers:filteredUsers,
            usersList:filteredUsers,
            loading: false
            };
        }

        case UsersActionTypes.DELETE_UNIT_USER_MAP_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        case UsersActionTypes.GET_USERS_UNIT_MAPPING_BY_USERID: {
            return {
                ...state,
                loading: true
            }
        }
        case UsersActionTypes.GET_USERS_UNIT_MAPPING_BY_USERID_SUCCESS: {
            return {
                ...state,
                loading: false
            }
        }
        default:
            return state;
    }

}
