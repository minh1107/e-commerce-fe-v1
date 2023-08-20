import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../apis'

export const getCurrentUser = createAsyncThunk('user/current', async(data, {rejectWithValue}) => {
    try {
        const response = await apis.apiCurrent()
        console.log(response)
        return response; // Assuming your API response has a `data` property
    } catch (error) {
        return rejectWithValue(error.response.data); // Pass the error response data
    }
})  
