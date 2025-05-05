import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosRequest from "../../axiosRequest/axiosRequests"

export const get = createAsyncThunk("todos/get", async () => {
  try {
    const { data } = await axiosRequest.get("Product/get-products?PageSize=100000")
    return data.data.products
  } catch (error) {
    console.log(error)
  }
})

export const del = createAsyncThunk("todos/del", async (id, { dispatch }) => {
  try {
    await axiosRequest.delete(`Product/delete-product?id=${id}`)
    dispatch(get())
  } catch (error) {
    console.log(error)
  }
})

export const addUser = createAsyncThunk("todos/addUser", async (user, { dispatch }) => {
  try {
    await axiosRequest.post("Product/add-product", user)
    dispatch(get())
  } catch (error) {
    console.log(error)
  }
})

export const editUser = createAsyncThunk(
  "todos/edit-user",
  async ({
    id, brandId, colorId, productName, description, quantity, weight, size,
    code, price, hasDiscount, discountPrice, subCategoryId
  }, { dispatch }) => {
    try {
      const { data } = await axiosRequest.put(
        `Product/update-product?id=${id}&BrandId=${brandId}&ColorId=${colorId}&ProductName=${productName}&Description=${description}&Quantity=${quantity}&Weight=${weight}&Size=${size}&Code=${code}&Price=${price}&HasDiscount=${hasDiscount}&DiscountPrice=${discountPrice}&SubCategoryId=${subCategoryId}`
      );
      dispatch(get());
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }
);


export const getProductById = createAsyncThunk("todos/getProductById", async (id) => {
  try {
    const { data } = await axiosRequest.get(`Product/get-product-by-id?id=${id}`)
    return data.data
  } catch (error) {
    console.log(error)
  }
})
export const updateProductImage = createAsyncThunk(
  "todos/updateProductImage",
  async ({ id, imageFile }, { dispatch }) => {
    try {
      const formData = new FormData()
      formData.append("Image", imageFile)

      const { data } = await axiosRequest.put(`Product/update-product-image?id=${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      dispatch(get())
      return data.data
    } catch (error) {
      console.error("Error updating product image:", error)
    }
  },
)

export const deleteProductImage = createAsyncThunk("todos/deleteProductImage", async (id, { dispatch }) => {
  try {
    await axiosRequest.delete(`Product/delete-image-from-product?imageId=${id}`)
    dispatch(get())
  } catch (error) {
    console.error(error)
  }
})

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    data: [],
    editableProduct: null,
    currentProduct: null,
  },
  reducers: {
    setProductName: (state, actions) => {
      state.productName = actions.payload
    },
    setCurrentProduct: (state, actions) => {
      state.currentProduct = actions.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get.fulfilled, (state, actions) => {
        state.data = actions.payload
      })
      .addCase(getProductById.fulfilled, (state, actions) => {
        state.editableProduct = actions.payload
      })
  },
})

export default todoSlice.reducer

export const { setProductName, setCurrentProduct } = todoSlice.actions
