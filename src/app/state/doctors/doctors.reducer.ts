import { DoctorsActionTypes, DoctorActions } from "./doctors.actions";
import { DoctorsState } from "./doctors.model";

export const initialState: DoctorsState = {
  doctorsList: [],
  currentClientDoctors: [],
  loading: false,
  error: null,
  message: '',
};

export function doctorsReducer(
  state: DoctorsState = initialState,
  action: DoctorActions
): DoctorsState {

  switch (action.type) {

    case DoctorsActionTypes.GET_DOCTORS:
      {
        return {
          ...state,
          loading: true
        };
      }

    case DoctorsActionTypes.GET_DOCTORS_SUCCESS:
      {
        return {
          ...state,
          doctorsList: action.payload.data,
          loading: false
        };
      }

    case DoctorsActionTypes.GET_DOCTORS_ERROR:
      {
        return {
          ...state,
          loading: false
        };
      }
    case DoctorsActionTypes.ADD_DOCTORS:
      {
        return {
          ...state,
          loading: true
        };
      }

    case DoctorsActionTypes.ADD_DOCTORS_SUCCESS:
      let docs;
      {
        let userRole = action.payload[1];
        if(userRole.indexOf("SUPER_ADMIN") >= 0){
          docs = [...state.currentClientDoctors];
        }else{
          docs = [...state.currentClientDoctors, action.payload[0].data];
        }
        return {
          ...state,
          currentClientDoctors: docs,
          doctorsList: docs,
          loading: false
        };
      }

    case DoctorsActionTypes.ADD_DOCTORS_ERROR:
      {
        return {
          ...state,
          loading: false
        };
      }

    case DoctorsActionTypes.GET_DOCTORS_BY_UNIT_ID:
      {
        return {
          ...state,
          loading: true
        };
      }

    case DoctorsActionTypes.GET_DOCTORS_BY_UNIT_ID_SUCCESS:
      {
        return {
          ...state,
          currentClientDoctors: action.payload.data,
          loading: false
        };
      }

    case DoctorsActionTypes.GET_DOCTORS_BY_UNIT_ID_ERROR:
      {
        return {
          ...state,
          loading: false
        };
      }

    case DoctorsActionTypes.UPDATE_DOCTORS:
      {
        return {
          ...state,
          loading: true
        };
      }

    case DoctorsActionTypes.UPDATE_DOCTORS_SUCCESS:
      {

        let docs = [...state.currentClientDoctors];
        let mbid = action.payload[0].data.id;
        let Updatedocs;
         
        let userRole = action.payload[1];
        if(userRole.indexOf("SUPER_ADMIN") >= 0){
          Updatedocs = [...state.currentClientDoctors];
        }else{
          Updatedocs = docs.map(ele => {
          if (ele.id === mbid) {
            return action.payload[0].data;
          }else{
            return ele
          }
          });
        }
        return {
          ...state,
          currentClientDoctors: Updatedocs,
          doctorsList: Updatedocs,
          loading: false
        };
      }

    case DoctorsActionTypes.UPDATE_DOCTORS_ERROR:
      {
        return {
          ...state,
          loading: false
        };
      }

    case DoctorsActionTypes.DELETE_DOCTORS:
      {
        return {
          ...state,
          loading: true
        };
      }

    case DoctorsActionTypes.DELETE_DOCTORS_SUCCESS: {
      const filteredDoctors = state.currentClientDoctors.filter(ele => {
        return action.payload.data[1] != ele.id;
      });
      return {
        ...state,
        currentClientDoctors: filteredDoctors,
        doctorsList: filteredDoctors,
        loading: false
      };
    }

    case DoctorsActionTypes.DELETE_DOCTORS_ERROR:
      {
        return {
          ...state,
          loading: false
        };
      }

    default:
      return state;
  }

}
