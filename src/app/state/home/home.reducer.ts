import { UiState } from "./home.model";

export const initialState: UiState = {
    details: null,
    loading: false,
    error: null,
    message: '',
};

export function homeReducer(
    state: UiState = initialState,
    action: any
): UiState {

    switch (action.type) {
        default:
            return state;
    }
}
