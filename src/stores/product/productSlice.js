import { createSlice } from "@reduxjs/toolkit";
import { getNewProducts, getBestSellerProducts } from "./asyncAction";

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        newArrival: null,
        isLoading: false,
        bestSeller: null
    },
    reducers: {
        logout: (state) => {
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getNewProducts.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getNewProducts.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.newArrival = payload
        })
        builder.addCase(getNewProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload?.message
        })
        builder.addCase(getBestSellerProducts.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getBestSellerProducts.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.bestSeller = payload
        })
        builder.addCase(getBestSellerProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload?.message
        })
    }
})
export const { logout } = productSlice.actions

export default productSlice.reducer