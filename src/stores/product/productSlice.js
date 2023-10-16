import { createSlice } from "@reduxjs/toolkit";
import { getNewProducts, getBestSellerProducts } from "./asyncAction";

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        newArrival: null,
        isLoading: false,
        bestSeller: null,
        productEditInfo: null,
        isProductEdit: false
    },
    reducers: {
        logout: (state) => {
            state.isLoading = false
        },
        setProduct: (state, action) => {
            state.productEditInfo = action.payload.product
            state.isProductEdit = action.payload.isProductEdit
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
export const { logout, setProduct } = productSlice.actions

export default productSlice.reducer