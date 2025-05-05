import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosRequest from "../../axiosRequest/axiosRequests";

export const getColor = createAsyncThunk("getColor/color", async () => {
    try {
        let { data } = await axiosRequest.get("Color/get-colors")
        return data.data
    } catch (error) {
        console.log(error)
    }
})

export const addColor = createAsyncThunk("addColor/color", async (color, { dispatch }) => {
    try {
        await axiosRequest.post(`Color/add-color?ColorName=${color.colorName}`);
        dispatch(getColor()); 
    } catch (error) {
        console.log(error);
    }
});


export const colorSlice = createSlice({
    name: "color",
    initialState: {
        data: [],
        multipleOptions: false,
        open: false,
        colorInput: ""
    },
    reducers: {
        setMultipleOptions: (state, actions) => {
            state.multipleOptions = actions.payload
        },
        setOpen: (state, actions) => {
            state.open = actions.payload
        },
        setColorInput:(state,actions) =>{
            state.colorInput = actions.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getColor.fulfilled, (state, actions) => {
                state.data = actions.payload
            })
    }
})

export default colorSlice.reducer

export const { setMultipleOptions, setOpen, setColorInput } = colorSlice.actions