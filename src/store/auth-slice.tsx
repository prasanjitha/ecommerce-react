import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: [],
        address: [],
    },
    reducers: {
        authUser(state: any, action) {
            state.user = action.payload;
        },
        addUserAddress(state: any, action) {
            state.address = action.payload;
        }
    }
});


export const authActions = authSlice.actions;
export default authSlice;