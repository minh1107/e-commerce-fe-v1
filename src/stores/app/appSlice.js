import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from './asyncActions'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        productCategory: [],
        isLoading: false,
        isShowModal: false,
        modalChildren: null,
        isUpdated: false
    },
    reducers: {
        showModal: (state, action) => {
            state.isShowModal =  action.payload.isShowModal
            state.modalChildren = action.payload.modalChildren
            state.isUpdated = action.payload.isUpdated
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
export const { showModal } = appSlice.actions

export default appSlice.reducer