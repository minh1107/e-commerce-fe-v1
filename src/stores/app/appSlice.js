import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from './asyncActions'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        productCategory: [],
        isLoading: false
    },
    reducers: {
        logout: (state) => {
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getCategories.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.productCategory = payload
        })
        builder.addCase(getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload?.message
        })
    }
})
export const { logout } = appSlice.actions

export default appSlice.reducer