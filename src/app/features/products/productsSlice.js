import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, postProducts } from "./productsAPI";

const initialState = {
    products: [],
    isLoading: false,
    postSuccess: false,
    isError: false,
    error: "",
};

export const getProducts = createAsyncThunk("products/getProduct", async () => {
    const products = fetchProducts();
    return products;
});
export const addProducts = createAsyncThunk("products/addProduct", async (data) => {
    const products = postProducts(data);
    return products;
});

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        togglePostSuccess : (state) => {
            state.postSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.isLoading = false;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.products = action.payload;
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
            })
            .addCase(addProducts.pending, (state) => {
                state.isLoading = true;
                state.postSuccess = false;
                state.isError = false;
            })
            .addCase(addProducts.fulfilled, (state) => {
                state.postSuccess = true;
                state.isLoading = false;
            })
            .addCase(addProducts.rejected, (state, action) => {
                state.products = action.payload;
                state.isLoading = false;
                state.postSuccess = false;
                state.isError = true;
                state.error = action.error.message;
            })
    },
});

export const { togglePostSuccess } = productsSlice.actions;

export default productsSlice.reducer;