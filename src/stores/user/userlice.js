import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "./asyncAction";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isLoading: false,
        isLoggedIn: false,
        token: null
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
        },
        logout: (state) => {
            state.isLoggedIn = false
            state.token = null
            state.currentUser = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.currentUser = action.payload
        })
        builder.addCase(getCurrentUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.token = null
            state.errorMessage = action.payload?.message
        })
    }
})
export const { login, logout } = userSlice.actions

export default userSlice.reducer