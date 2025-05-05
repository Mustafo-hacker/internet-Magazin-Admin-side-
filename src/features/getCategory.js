import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosRequest from "../../axiosRequest/axiosRequests"

export const getCategory = createAsyncThunk('category/getCategory', async () => {
    try {
        let { data } = await axiosRequest.get('/Category/get-categories')
        return data.data
    } catch (error) {
        console.log(error)
    }
})


export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id, { dispatch }) => {
    try {
        await axiosRequest.delete(`/Category/delete-category?id=${id}`)
        dispatch(getCategory())
    } catch (error) {
        console.log(error)
    }
})


export const addCategory = createAsyncThunk('category/addCategory', async (formdata, { dispatch }) => {
    try {
        await axiosRequest.post(`/Category/add-category`, formdata)
        dispatch(getCategory())
    } catch (error) {
        console.log(error)
    }
})


export const editCategory = createAsyncThunk('category/editCategory', async (formdata, { dispatch }) => {
    try {
        await axiosRequest.put('/Category/update-category', formdata)
        dispatch(getCategory())
    } catch (error) {
        console.log(error)
    }
})


export const categorySlice = createSlice({
    name: "category",
    initialState: {
        getCateg: []
    },
    // reducers:{}
    extraReducers: (bulider) => {
        bulider
            .addCase(getCategory.fulfilled, (state, actions) => {
                state.getCateg = actions.payload
            })
    }
})

export default categorySlice.reducer