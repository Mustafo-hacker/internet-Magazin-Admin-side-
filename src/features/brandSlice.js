import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosRequest from "../../axiosRequest/axiosRequests";


export const getBrand = createAsyncThunk("getBrand/brand", async() =>{
    try {
        let { data } = await axiosRequest.get("Brand/get-brands")
        return data.data
    } catch (error) {
        console.log(error)
    }
})

export const brandSlice = createSlice({
    name: "brand",
    initialState:{
        brands:[]
    },
    // reducers:{}
    extraReducers:(builder) =>{
        builder
        .addCase(getBrand.fulfilled, (state,actions) =>{
            state.brands = actions.payload
        })
    }
})

export default brandSlice.reducer