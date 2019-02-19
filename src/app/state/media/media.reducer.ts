import * as arrayToTree from 'array-to-tree';

import { MediaActionTypes, MediaActions } from './media.actions';
import { MediaState } from './media.model';

export const initialState: MediaState = {
    
    mediaList: [],
    
    loading: false,
    error: null,
    message: '',
};

export function mediaReducer(
    state: MediaState = initialState,
    action: MediaActions
): MediaState {

    switch (action.type) {

        case MediaActionTypes.GET_MEDIA: {
            return {
                ...state,
                loading: true
            };
        }

        case MediaActionTypes.GET_MEDIA_SUCCESS: {
            const mediaList = action.payload.data.media;
            return {
                ...state,
                mediaList: mediaList,
                loading: false
            };
        }

        case MediaActionTypes.GET_MEDIA_ERROR: {
            return {
                ...state,
                loading: false
            };
        }
        
        case MediaActionTypes.UPLOAD_MEDIA: {
            return {
                ...state,
                loading: true
            };
        }

        case MediaActionTypes.UPLOAD_MEDIA_SUCCESS: {
            // const mediaList = action.payload.data;
            return {
                ...state,
                // mediaList: mediaList,
                loading: false
            };
        }

        case MediaActionTypes.UPLOAD_MEDIA_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        case MediaActionTypes.APPROVE_UPLOAD_MEDIA: {
            return {
                ...state,
                loading: true
            };
        }

        case MediaActionTypes.APPROVE_UPLOAD_MEDIA_SUCCESS: {
            // const mediaList = action.payload.data;
            return {
                ...state,
                // mediaList: mediaList,
                loading: false
            };
        }

        case MediaActionTypes.APPROVE_UPLOAD_MEDIA_ERROR: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state;
    }
}
