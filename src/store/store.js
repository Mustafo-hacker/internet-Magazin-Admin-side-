import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import todoSlice from "../features/todoSlice";
import colorSlice from "../features/colorSlice";
import categorySlice from "../features/getCategory";
import brandSlice from "../features/brandSlice";


export const store = configureStore({
    reducer: {
        todo: todoSlice,
        color: colorSlice,
        category: categorySlice,
        brand: brandSlice
    }
})