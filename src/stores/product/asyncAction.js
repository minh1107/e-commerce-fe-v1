import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../apis'

export const getNewProducts = createAsyncThunk('product/newProducts', async(data, {rejectWithValue}) => {
    try {
        const response = await apis.apiGetProduct({ sort: '-createAt', ...data});
        return response.product; // Assuming your API response has a `data` property
    } catch (error) {
        return rejectWithValue(error.response.data); // Pass the error response data
    }
})  


export const getBestSellerProducts = createAsyncThunk('product/bestSellerProducts', async(data, {rejectWithValue}) => {
    try {
        const response = await apis.apiGetProduct({ sort: '-sold', ...data});
        return response.product; // Assuming your API response has a `data` property
    } catch (error) {
        return rejectWithValue(error.response.data); // Pass the error response data
    }
})  
