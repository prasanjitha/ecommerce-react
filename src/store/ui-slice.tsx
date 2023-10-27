import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({

    name: 'ui',
    initialState: {
        isLoading: false,
        notification: null,

    },
    reducers: {
        loadingSpinner(state, action) {
            state.isLoading = action.payload;
            console.log(state.isLoading);
        },
        showNotification(state: any, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            }
        },
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;